import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import sleep from "../../lib/sleep";
import Navbar from "../../components/Navbar";

export default function Room() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const init = async () => {
      //Get URL Params
      const searchParams = new URL(window.location).searchParams;
      const proxy = searchParams.get("v");
      const buf = searchParams.get("xor");

      //Define Streams
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const remoteStream = new MediaStream();

      //Create RTCPeerConnection
      const servers = {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun1.2.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      };
      let pc = new RTCPeerConnection(servers);

      //Add the tracks
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      //Pull the tracks from the remote stream
      pc.ontrack = (event) => {
        console.log("bruh, it got fired!");
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };

      //Get Ice Candidates and the SDP
      const iceCandidates = [];
      pc.onicecandidate = (event) => {
        event.candidate && iceCandidates.push(event.candidate);
      };

      //Create Offer for the SDP
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      //Initialize Socket
      const newSocket = io("http://localhost:1829");
      setSocket(newSocket);
      console.log(newSocket);

      //Create Data object
      const data = {
        callSDP: offer,
        callICE: iceCandidates,
        proxy,
      };

      await sleep(1000);
      console.log(data);

      newSocket.emit("init", JSON.stringify(data));

      return () => newSocket.close();
    };
    init();
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
}
