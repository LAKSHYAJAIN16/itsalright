import React, { useEffect, useState, useRef } from "react";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";
import genID from "../../../lib/genID";
import Navbar from "../../../components/Navbar";

export default function AnswerRoom() {
  const local = useRef();
  const remote = useRef();

  useEffect(() => {
    const act = async () => {
      //Get URL Params
      const searchParams = new URL(window.location).searchParams;
      const proxy = searchParams.get("v");
      const buf = searchParams.get("b");

      //Servers
      const servers = {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun1.2.google.com:19302",
            ],
          },
        ],
      };

      //Open WebRTC connection
      let pc = new RTCPeerConnection(servers);

      //Get the Local Stream and set it
      const localStream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      local.current.srcObject = localStream;
      local.current.play();

      //Assign the local Tracks to the webRTC connection
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      //Get the Document according to the proxy
      const rDoc = await getDoc(doc(db, "calls", proxy));

      //Also, get the Ice Candidates in the sub-collection
      const rCandidates = await getDocs(
        collection(db, "calls", proxy, "callCandidates")
      );

      //Set it as remote Description
      pc.setRemoteDescription(new RTCSessionDescription(rDoc.data().callSDP));

      //Loop through and actually extract the data
      const callCandidates = [];
      rCandidates.docs.forEach((document) => {
        callCandidates.push(document.data());
        pc.addIceCandidate(new RTCIceCandidate(document.data()));
      });

      //On Track callback, create remote stream
      const remoteStream = new MediaStream();
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
          remote.current.srcObject = remoteStream;
          remote.current.play();
        });
      };

      //Ice Candidate call back
      const answerICE = [];
      pc.onicecandidate = async (event) => {
        event.candidate && console.log("so?");
        event.candidate && answerICE.push(event.candidate);
        if (event.candidate) {
          if (buf !== "false") {
            await setDoc(
              doc(db, "calls", proxy, "answerCandidates", genID(10)),
              event.candidate.toJSON()
            );
          }
        }
      };

      //Create Answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      //Update Doc
      await updateDoc(doc(db, "calls", proxy), {
        answerSDP: {
          sdp: answer.sdp,
          type: answer.type,
        },
      });

      console.log(rDoc.data());
      console.log(callCandidates);
    };

    act();
  }, []);

  return (
    <>
      <Navbar />
      <div className="vids">
        <video muted ref={local}></video>
        <video ref={remote}></video>
      </div>
    </>
  );
}
