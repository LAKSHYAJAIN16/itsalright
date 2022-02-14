import React from "react";
import Navbar from "../components/Navbar";

export default function masthead() {
  return (
    <>
      <Navbar />
      <div className="content" style={{ textAlign: "center" }}>
        <h1>Credits</h1>
        <br />
        <p><b>Idea :</b> Lakshya Jain</p>
        <p><b>Design :</b> Lakshya Jain</p>
        <p><b>Graphics :</b> Lakshya Jain</p>
        <p><b>Marketing :</b> Lakshya Jain</p>
        <p><b>Programming :</b> Lakshya Jain</p>
        <p><b>Literally everything lol :</b> Lakshya Jain</p>
      </div>
    </>
  );
}
