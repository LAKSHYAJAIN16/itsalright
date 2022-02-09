import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import Navbar from "../../components/Navbar";
import sleep from "../../lib/sleep";

export default function ViewerRoom() {
  const [socket, setSocket] = useState(null);
  const localVid = useRef();
  const remoteVid = useRef();

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
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };

      //Get Ice Candidates and the SDP
      const iceCandidates = [];
      pc.onicecandidate = (event) => {
        event.candidate && iceCandidates.push(event.candidate);
      };

      //Initialize Socket
      const newSocket = io("http://localhost:1829");
      setSocket(newSocket);

      //Create Data object
      const data = {
        id: proxy,
      };

      //Join Call
      newSocket.emit("join", JSON.stringify(data));

      //Joined Call Auth Callback
      newSocket.on("join-call", (buffer) => {
        //Deserialize
        const data = JSON.parse(buffer);
        console.log(data);

        //Get that SDP
        const answer = data.offer;
        const remoteDescription = new RTCSessionDescription(answer);
        pc.setRemoteDescription(remoteDescription);

        //Get the Ice Candidates and loop over and add them
        data.iceCandidates.map((ice) => {
          const candidate = new RTCIceCandidate(ice);
          pc.addIceCandidate(candidate);
        });

        remoteVid.current.srcObject = remoteStream;
      });

      //Apply to the DOM
      localVid.current.srcObject = localStream;
      remoteVid.current.srcObject = remoteStream;

      return () => newSocket.close();
    };
    init();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <video ref={localVid} muted id="local" autoPlay></video>
        <video ref={remoteVid} muted id="remote" controls autoPlay></video>
      </div>
    </>
  );
}
