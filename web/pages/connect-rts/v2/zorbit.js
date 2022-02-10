import React, { useEffect, useState, useRef } from "react";
import { setDoc, doc, onSnapshot, collection } from "firebase/firestore";

import { db } from "../../../lib/firebase";
import genID from "../../../lib/genID";
import Navbar from "../../../components/Navbar";

export default function Room() {
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

      //Listen to Document Updates
      const sdpChange = onSnapshot(doc(db, "calls", proxy), (document) => {
        const source = document.metadata.hasPendingWrites ? "Local" : "Server";
        if (source === "Server") {
          //Get the Data
          const data = document.data();

          //Get the Answer SDP
          const answerSDP = data.answerSDP;
          const remoteDescription = new RTCSessionDescription(answerSDP);
          pc.setRemoteDescription(remoteDescription);

          console.log("connected via answerSDP");
        }
      });

      const iceChange = onSnapshot(
        collection(db, "calls", proxy, "answerCandidates"),
        (document) => {
          document.docChanges().forEach((change) => {
            if (change.type === "added") {
              const candidate = new RTCIceCandidate(change.doc.data());
              pc.addIceCandidate(candidate);
            }
          });
        }
      );

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
      const callICE = [];
      pc.onicecandidate = async (event) => {
        event.candidate && console.log("so?");
        event.candidate && callICE.push(event.candidate);
        if (event.candidate) {
          if (buf !== "false") {
            await setDoc(
              doc(db, "calls", proxy, "callCandidates", genID(10)),
              event.candidate.toJSON()
            );
          }
        }
      };

      //Create SDP
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      //Gather the SDP and type
      const callSDP = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      //Send that to firebase
      await setDoc(doc(db, "calls", proxy), {
        proxy: proxy,
        callSDP: callSDP,
      });
    };
    act();
  }, []);

  return (
    <>
      <Navbar />
      <div className="vids">
        <video muted ref={local}></video>
        <video muted ref={remote}></video>
      </div>
    </>
  );
}
