import React from "react";

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function masthead() {
  return (
    <>
      <Meta title={"Masthead"} desc={"Masthead"} />
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
        <br />
        <p>my brain</p>
        <p>3 months</p>
      </div>
    </>
  );
}
