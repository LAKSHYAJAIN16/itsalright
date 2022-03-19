import React from "react";
import axios from "axios";

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function Helpdesk() {
  const send = async () => {
      const text = document.getElementById("fi").value;
      await axios.get(`/api/email/help-desk?m=${text}`);
      window.location.replace("/");
  };

  return (
    <>
      <Navbar />
      <Meta title={"Contact our Team"} desc={"Contact our Team for any bugs or glitches"}/>
      <div className="content" style={{ textAlign: "center" }}>
        <h1>Helpdesk</h1>
        <p>If you want to contact our team, type your Message here</p>
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
