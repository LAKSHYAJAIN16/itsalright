import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Report() {
  const send = async () => {
    const text = document.getElementById("fi").value;
    await axios.get(`/api/email/report?m=${text}`);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
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
