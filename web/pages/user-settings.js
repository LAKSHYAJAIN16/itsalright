import React, { useEffect, useState } from "react";

import Procrastinator from "../components/Procrastinator";
import Navbar from "../components/Navbar";

export default function UserSettings() {
  const [pass, setPass] = useState(false);
  const [d, setD] = useState({});

  useEffect(() => {
    setD(JSON.parse(localStorage.getItem("user") || ""));
    setPass(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("logged");
    window.location.replace("/home");
  };

  return (
    <>
      <Navbar />
      <div className="content">
        {pass === false ? (
          <>
            <Procrastinator />
          </>
        ) : (
          <div style={{ zoom: 0.9 }}>
            <div className="row">
              <p>Your Profile Pic</p>
            </div>
            <div className="row">
              <img src={d.profilePic} className="profilePic"></img>
            </div>

            <br />
            <div className="row">
              <p>Your Username</p>
            </div>
            <div className="row">
              <b>{d.name}</b>
            </div>

            <br />
            <div className="row">
              <p>Your Email</p>
            </div>
            <div className="row">
              <b>{d.email}</b>
            </div>

            <br />
            <div className="row">
              <p>Your UserID</p>
            </div>
            <div className="row">
              <b>{d.id}</b>
            </div>

            <br />
            <div className="row">
              <a href="/forgot-password">
                <button className="standardButton" style={{ width: "200px" }}>
                  Reset Password
                </button>
              </a>
            </div>

            <br />
            <br />
            <div className="row">
              <button className="standardButton" onClick={() => logout()}>
                Logout
              </button>
            </div>
            <br />
            <br />
            <p style={{ textAlign: "center", zoom: 0.6 }}>
              Psst.... We're working on this page right now! Currently we've
              just thrown together some adhawk UI, but in some time it'll be
              polished.
            </p>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .profilePic {
            height: 165px;
            width: 165px;
            border-radius: 20px;
            cursor: pointer;
          }

          .row {
            display: flex;
            justify-content: center;
            flex-direction: row;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
