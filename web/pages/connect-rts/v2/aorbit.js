import React, { useEffect, useState, useRef } from "react";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import styles from "../../../styles/Connect.module.css";
import { db } from "../../../lib/firebase";
import genID from "../../../lib/genID";
import Procrastinator from "../../../components/Procrastinator";
import Navbar from "../../../components/Navbar";

export default function AnswerRoom() {
  const local = useRef();
  const remote = useRef();
  const [rC, setRC] = useState(false);
  const [ui, setUi] = useState(0);

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
      const endChange = onSnapshot(
        doc(db, "calls", proxy),
        async (document) => {
          const source = document.metadata.hasPendingWrites
            ? "Local"
            : "Server";
          if (document.exists()) {
            if (source === "Server") {
              //Get the Data
              const data = document.data();
              if (data.proxy === "ended") {
                //Redirect to end screen
                setUi(1);

                //Delete the document instances (or at least try to)
                await deleteDoc(doc(db, "available-calls", proxy));
                await deleteDoc(doc(db, "calls", proxy));
              }
            }
          }
        }
      );

      //Register Window.beforeunload
      window.onbeforeunload = async function () {
        //Update Call so that the proxy is null
        if (ui === 0) {
          //Update the Doc so that the proxy is null
          await updateDoc(doc(db, "calls", proxy), {
            proxy: "ended",
          });

          //Delete the document instances (or at least try to)
          await deleteDoc(doc(db, "available-calls", proxy));
          await deleteDoc(doc(db, "calls", proxy));
        }
      };

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
        setRC(true);
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

  const endCall = async () => {
    const searchParams = new URL(window.location).searchParams;
    const proxy = searchParams.get("v");

    //Update the Doc so that the proxy is null
    await updateDoc(doc(db, "calls", proxy), {
      proxy: "ended",
    });

    //Delete the document instances (or at least try to)
    await deleteDoc(doc(db, "available-calls", proxy));
    await deleteDoc(doc(db, "calls", proxy));

    setUi(1);
  };

  return (
    <>
      <Navbar />
      {ui === 0 && (
        <>
          <div className={styles.vids}>
            <div>
              <video muted ref={local} className={styles.vid}></video>
              <p style={{ textAlign: "center" }}>You</p>
            </div>
            {rC === true && (
              <div>
                <video ref={remote} className={styles.vid}></video>
                <p style={{ textAlign: "center" }}>Expert</p>
              </div>
            )}
          </div>
          <br />
          {rC === false && (
            <>
              <Procrastinator />
              <p style={{ textAlign: "center" }}>Waiting for Expert</p>
            </>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="standardButton" onClick={() => endCall()}>
              End Call
            </button>
          </div>
        </>
      )}
      {ui === 1 && (
        <div className={styles.discMain}>
          <img src="/ended.gif" className={styles.discImage}></img>
          <br />
          <h1>Call Ended</h1>
          <br />
          <a href="/home">
            <button className="standardButton" style={{ width: "200px" }}>
              Back to Homepage
            </button>
          </a>
        </div>
      )}
    </>
  );
}
