import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [logged, setLogged] = useState(undefined);
  const [isExpert, setIsExpert] = useState(false);
  const [profilePIC, setProfilePIC] = useState(undefined);
  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      setLogged(JSON.parse(localStorage.getItem("logged")) || false);
      setProfilePIC(JSON.parse(localStorage.getItem("user"))?.profilePic);
      setIsExpert(JSON.parse(localStorage.getItem("user"))?.isExpert);
    }
  }, []);
  return (
    <>
      {logged !== undefined && (
        <>
          {" "}
          <div className="main">
            <a href="/home">
              <p className="logoText">
                itsalright {isExpert && <span className="expert">Expert</span>}
              </p>
            </a>

            {isExpert ? (
              <>
                <a href="/browse">
                  <p className="navOption" style={{ zoom: 0.93 }}>
                    Answer
                  </p>
                </a>
                <a href="/beta/connect">
                  <p className="navOption" style={{ zoom: 0.93 }}>
                    Connect
                  </p>
                </a>
                <a href="/expert/messages">
                  <p className="navOption" style={{ zoom: 0.93 }}>
                    Messages
                  </p>
                </a>
                <a href="/expert/leaderboard">
                  <p className="navOption" style={{ zoom: 0.93 }}>
                    Leaderboard
                  </p>
                </a>
              </>
            ) : (
              <>
                <a href="/browse">
                  <p className="navOption">Browse</p>
                </a>
                <a href="/share">
                  <p className="navOption">Share</p>
                </a>
                <a href="/beta/connect">
                  <p className="navOption">Connect</p>
                </a>
                <a href="/contact">
                  <p className="navOption">Contact</p>
                </a>
              </>
            )}

            {logged ? (
              <>
                <img src={profilePIC} className="profilePic"></img>
              </>
            ) : (
              <p>Log in clown</p>
            )}
          </div>
          <style jsx>
            {`
              .main {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 2px;
              }

              .logoText {
                font-weight: 500;
                font-family: var(--logofont);
                font-size: 2.4em;
                margin-left: 100px;
                margin-right: 180px;
                color: black;
              }

              .navOption {
                color: darkgray;
                font-size: 1.2em;
                font-weight: 300;
                font-family: var(--mainfont);
                margin-right: 80px;
                cursor: pointer;
                transition: all 500ms ease;
              }

              .navOption:hover {
                color: black;
              }

              .profilePic {
                height: 65px;
                width: 65px;
                border-radius: 50%;
                margin-left: 160px;
                cursor: pointer;
              }

              .expert {
                font-family: var(--royalfont);
                font-size: 0.6em;
                font-weight: 400;
                color: var(--royalcolor);
              }
            `}
          </style>
        </>
      )}
    </>
  );
}
