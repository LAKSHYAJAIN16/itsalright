import React from "react";
import Navbar from "../components/Navbar";

export default function masthead() {
  return (
    <>
      <Navbar />
      <div className="content" style={{ textAlign: "center" }}>
        <h1>Masthead</h1>
        <br />
        <br />
        <p>
          <b>Technologies or Assets used : </b>
        </p>
        <p>Next JS (powered by Vercel)</p>
        <p>React (powered by Meta)</p>
        <p>React Native (powered by Meta)</p>
        <p>Webrtc (powered by Google)</p>
        <p>Firebase (powered by Google)</p>
        <p>The Dicebear Avatar API</p>
        <p>Javascript</p>
        <p>node.js</p>
      </div>
    </>
  );
}