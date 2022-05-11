import React, { useEffect, useState } from "react";
import axios from "axios";

import Procrastinator from "../components/Procrastinator";
import Navbar from "../components/Navbar";

export default function Flag() {
  const [renderB, setRenderB] = useState(false);
  const [userIDc, setUserIDc] = useState("");
  const [commentIDc, setCommentIDc] = useState("");
  const [redirectURLc, setRedirectURLc] = useState("");

  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (ISSERVER === false) {
      const userID = new URL(window.location.href).searchParams.get("v");
      const commentID = new URL(window.location.href).searchParams.get("c");
      const redirectURL = new URL(window.location.href).searchParams.get(
        "redirect_url"
      );

      setUserIDc(userID);
      setCommentIDc(commentID);
      setRedirectURLc(redirectURL);
      setRenderB(true);
    }
  }, []);

  const send = async () => {
    const text = document.getElementById("fi").value;
    setRenderB(false);
    await axios.get(`/api/email/report?m=${text}`);
    window.location.replace(redirectURLc);
  };

  return (
    <>
      {renderB ? (
        <>
          <Navbar />
          <div className="content" style={{ textAlign: "center", fontFamily:"var(--mainfont)" }}>
            <h1>Flag</h1>
            <p>
              If you want to Flag or report a comment, you can do so here. We
              have added some text as default, though you can add more if you
              want.
            </p>
            <br />
            <textarea
              style={{ height: "300px", width: "80vw" }}
              id="fi"
              defaultValue={`I, user ${userIDc} want to report comment ${commentIDc} because...`}
            ></textarea>
            <br />
            <br />
            <button className="standardButton" onClick={() => send()}>
              Send
            </button>
          </div>
        </>
      ) : (
        <>
          <Procrastinator />
        </>
      )}
    </>
  );
}
