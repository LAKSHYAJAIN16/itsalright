import React from "react";

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function Credits() {
  return (
    <>
      <Navbar />
      <Meta title={"Credits"} desc={"The Credits for Itsalright"} />
      <div
        className="content"
        style={{ textAlign: "center", fontFamily: "var(--mainfont)" }}
      >
        <h1>Credits</h1>
        <br />
        <p>
          <b>Idea :</b> Lakshya Jain
        </p>
        <p>
          <b>Design :</b> Lakshya Jain
        </p>
        <p>
          <b>Graphics :</b> Lakshya Jain
        </p>
        <p>
          <b>Marketing :</b> Lakshya Jain, Lakshya Jain, Aaradhya Bharadwaj
        </p>
        <p>
          <b>Programming :</b> Lakshya Jain
        </p>
      </div>
    </>
  );
}
