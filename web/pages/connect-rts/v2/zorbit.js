import React, { useEffect, useState, useRef } from "react";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import styles from "../../../styles/Connect.module.css";
import { db } from "../../../lib/firebase";
import genID from "../../../lib/genID";
import Procrastinator from "../../../components/Procrastinator";
import Navbar from "../../../components/Navbar";

export default function Room() {
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
            urls: "stun:openrelay.metered.ca:80",
          },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      };

      //Open WebRTC connection
      try {
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
        const sdpChange = onSnapshot(
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
                  //End Call
                  setUi(1);
  
                  //Delete the document instances (or at least try to)
                  await deleteDoc(doc(db, "available-calls", proxy));
                  await deleteDoc(doc(db, "calls", proxy));
                } else if (data.proxy !== "ended") {
                  //Get the Answer SDP
                  const answerSDP = data.answerSDP;
                  const remoteDescription = new RTCSessionDescription(answerSDP);
                  pc.setRemoteDescription(remoteDescription);
  
                  console.log("connected via answerSDP");
                }
              }
            }
          }
        );
  
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
          setRC(true);
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
  
        //Register Window.beforeunload
        window.onbeforeunload = async function () {
          if (ui === 0) {
            //Update Call so that the proxy is null
            await updateDoc(doc(db, "calls", proxy), {
              proxy: "ended",
            });
  
            //Delete the document instances (or at least try to)
            await deleteDoc(doc(db, "available-calls", proxy));
            await deleteDoc(doc(db, "calls", proxy));
          }
        };
      }

      catch(err){
        window.location.replace(`/callbacks/something-went-wrong?n=${err.name}`);
      }
    };

    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/login");
    } else if (user) {
      act();
    }
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
        <>
          <div className={styles.discMain}>
            <img src="/thanks.gif" className={styles.discImage}></img>
            <br />
            <h1>Call Ended</h1>
            <br />
            <a href="/home">
              <button className="standardButton" style={{ width: "200px" }}>
                Back to Homepage
              </button>
            </a>
          </div>
        </>
      )}
    </>
  );
}
