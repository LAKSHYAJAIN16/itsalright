import React from "react";
import axios from "axios";

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function Report() {
  const send = async () => {
    const text = document.getElementById("fi").value;
    await axios.get(`/api/email/report?m=${text}`);
    window.location.replace("/");
  };

  return (
    <>
      <Navbar />
      <Meta
        title={"Report"}
        desc={
          "If you want to report a user for any malicious or hateful activity, do it here"
        }
      />
      <div className="content" style={{ textAlign: "center" }}>
        <h1>Report</h1>
        <p>
          If you want to report anything, write it here. This message will go
          straight to our team.
        </p>
        <br />
        <textarea style={{ height: "300px", width: "80vw" }} id="fi"></textarea>
        <br />
        <br />
        <button className="standardButton" onClick={() => send()}>
          Send
        </button>
      </div>
    </>
  );
}
