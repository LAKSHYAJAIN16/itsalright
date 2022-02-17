import React, { useEffect, useState, useRef } from "react";

import Procrastinator from "../components/Procrastinator";
import Navbar from "../components/Navbar";

export default function UserSettings() {
  const [pass, setPass] = useState(false);
  const [d, setD] = useState({});
  const profile = useRef();
  const notifications = useRef();
  const ef = useRef();
  const auth = useRef();
  const api = useRef();
  const danger = useRef();

  useEffect(() => {
    setD(JSON.parse(localStorage.getItem("user") || ""));
    setPass(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("logged");
    window.location.replace("/home");
  };

  const scrollT = (ref) => {
    ref.current.scrollIntoView();
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
          <>
            <div className="main">
              <div className="sidebar">
                <div className="sideItem">Settings</div>

                <div className="sideItemN" onClick={() => scrollT(profile)}>
                  Profile
                </div>

                <div
                  className="sideItemN"
                  onClick={() => scrollT(notifications)}
                >
                  Notifications
                </div>

                <div className="sideItemN" onClick={() => scrollT(ef)}>
                  Expert Features
                </div>

                <div className="sideItemN" onClick={() => scrollT(auth)}>
                  Authentication
                </div>

                <div className="sideItemN" onClick={() => scrollT(api)}>
                  API and Integration
                </div>

                <div
                  className="sideItemN"
                  style={{ color: "red" }}
                  onClick={() => scrollT(danger)}
                >
                  Danger
                </div>
              </div>

              <div className="settings">
                <div className="category" ref={profile}>
                  <p className="categoryHeader">Profile</p>
                  <div className="cat">
                    <p className="catHead">Name</p>
                    <p className="catTxt">{d.name}</p>
                    <button className="standardButton catEdit">Edit</button>
                    <p className="catDesc">
                      This will be visible when you comment, share or connect.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Email</p>
                    <p className="catTxt">{d.email}</p>
                    <button className="standardButton catEdit">Edit</button>
                    <p className="catDesc">
                      This is used for OTPs, and Password Resets.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Profile Picture</p>
                    <button
                      className="standardButton catEdit"
                      style={{ marginTop: "-30px" }}
                    >
                      Edit
                    </button>
                    <p className="catDesc">
                      This appears next to your name.
                      <br />
                      Supported Formats are GIF, PNG and JPG
                      <br />
                      Size Limit : 10mb
                      <br />
                      Recommended Shape : Square
                    </p>
                    <img
                      src={d.profilePic}
                      style={{
                        position: "absolute",
                        height: "100px",
                        width: "100px",
                        marginTop: "-100px",
                        marginLeft: "350px",
                      }}
                    />
                  </div>
                </div>

                <br />
                <br />
                <br />
                <div className="category" ref={notifications}>
                  <p className="categoryHeader">Notifications</p>
                  <div className="cat">
                    <p className="catHead">Notification Email</p>
                    <p className="catTxt">{d.email}</p>
                    <button className="standardButton catEdit">Edit</button>
                    <p className="catDesc">
                      This will be used for notifications and newsletters.
                      <br />
                      By default, the notification email is the same as the
                      regular email.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Newsletters</p>
                    <p className="catDesc">
                      Monthly Newsletters highlighting updates, changes and new
                      experts.
                      <br />
                      These are on by default.
                    </p>
                    <p
                      className="catTxt"
                      style={{ marginTop: "-75px", marginLeft: "500px" }}
                    >
                      <input
                        type="checkbox"
                        id="news"
                        className="switch"
                      ></input>
                      <label htmlFor="news" className="switch-label"></label>
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Comment Notifications</p>
                    <p className="catDesc">
                      Notifications whenever a user comments on your post.
                      <br />
                      These are on by default.
                    </p>
                    <p
                      className="catTxt"
                      style={{ marginTop: "-75px", marginLeft: "500px" }}
                    >
                      <input
                        type="checkbox"
                        id="cment"
                        className="switch"
                      ></input>
                      <label htmlFor="cment" className="switch-label"></label>
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Message Notifications</p>
                    <p className="catDesc">
                      Notifications whenever someone replies to your message.
                      <br />
                      These are on by default.
                    </p>
                    <p
                      className="catTxt"
                      style={{ marginTop: "-75px", marginLeft: "500px" }}
                    >
                      <input type="checkbox" id="rm" className="switch"></input>
                      <label htmlFor="rm" className="switch-label"></label>
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      Security Notifications
                    </p>
                    <p className="catDesc">
                      Notifications whenever someone logs in or uses your
                      account.
                      <br />
                      We recommend you to keep these on.
                    </p>
                    <p
                      className="catTxt"
                      style={{ marginTop: "-75px", marginLeft: "500px" }}
                    >
                      <input type="checkbox" id="sn" className="switch"></input>
                      <label htmlFor="sn" className="switch-label"></label>
                    </p>
                  </div>
                </div>

                <br />
                <br />
                <br />
                <div className="category" ref={ef}>
                  <p className="categoryHeader">Expert Features</p>
                  {d.isExpert ? (
                    <>
                      <div className="cat">
                        <p className="catHead">Profession</p>
                        <p className="catTxt">{d.expertData.profession}</p>
                        <button className="standardButton catEdit">Edit</button>
                        <p className="catDesc">
                          This will be visible when someone will try to contact
                          you.
                        </p>
                      </div>

                      <div className="cat">
                        <p className="catHead">Bio</p>
                        <p className="catTxt">{d.expertData.bio}</p>
                        <button className="standardButton catEdit">Edit</button>
                        <p className="catDesc">
                          This will be visible when someone will try to contact
                          you.
                        </p>
                      </div>

                      <div className="cat">
                        <p className="catHead">Social Media</p>
                        <p className="catTxt">{d.expertData.socialmedia}</p>
                        <button className="standardButton catEdit">Edit</button>
                        <p className="catDesc">
                          This will be visible when someone will try to contact
                          you.
                        </p>
                      </div>

                      <div className="cat">
                        <p className="catHead" style={{ color: "red" }}>
                          Exit Expert Program
                        </p>
                        <p className="catDesc">
                          This will remove your status as an expert, and convert
                          you back to a regular user.
                        </p>
                        <button
                          className="standardButton"
                          style={{
                            width: "300px",
                            height: "50px",
                            marginLeft: "100px",
                            marginTop: "10px",
                          }}
                        >
                          Exit Expert Program
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>These Features are only for Experts</p>
                    </>
                  )}
                </div>

                <br />
                <br />
                <br />
                <div className="category" ref={auth}>
                  <p className="categoryHeader">Authentication</p>
                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      UserID
                    </p>
                    <p className="catTxt">
                      <em>{d.id}</em>
                    </p>
                    <button className="standardButton catEdit">Reveal</button>
                    <p className="catDesc">
                      This is your UserID. This can be used to signin via our
                      API, or for 2FA.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      Reset Password
                    </p>
                    <p className="catDesc">
                      This will reset your password, by sending an otp to your
                      email address.
                    </p>
                    <a href="/forgot-password">
                      <button
                        className="standardButton"
                        style={{
                          width: "300px",
                          height: "50px",
                          marginLeft: "100px",
                          marginTop: "10px",
                        }}
                      >
                        Reset Password
                      </button>
                    </a>
                  </div>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      2FA
                    </p>
                    <p className="catDesc">
                      By Enabling 2FA, when logging in you will also have to
                      enter your
                      <br />
                      UserID. Password Resets are also disabled with 2FA.
                    </p>
                    <p
                      className="catTxt"
                      style={{ marginTop: "-75px", marginLeft: "500px" }}
                    >
                      <input
                        type="checkbox"
                        id="2fa"
                        className="switch"
                      ></input>
                      <label htmlFor="2fa" className="switch-label"></label>
                    </p>
                  </div>
                </div>

                <br />
                <br />
                <br />
                <div className="category" ref={api}>
                  <p className="categoryHeader">API and Integration</p>
                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      API key
                    </p>
                    <p className="catTxt">
                      <em>{d.id + d.id.split("").reverse().join("")}</em>
                    </p>
                    <button className="standardButton catEdit">Reveal</button>
                    <p className="catDesc">
                      This is your API Key, which can be used to access our API.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      OAuth Key
                    </p>
                    <p className="catTxt">
                      <em>{d.id.split("").reverse().join("")}</em>
                    </p>
                    <button className="standardButton catEdit">Reveal</button>
                    <p className="catDesc">
                      This is your API Key, which can be used to access our
                      OAuth Features.
                    </p>
                  </div>
                </div>

                <br />
                <br />
                <br />
                <div className="category" ref={danger}>
                  <p className="categoryHeader" style={{ color: "red" }}>
                    Danger
                  </p>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      Delete Account
                    </p>
                    <p className="catDesc">
                      This will delete all of your account Data, and sign you
                      out.
                    </p>
                    <button
                      className="standardButton"
                      style={{
                        width: "300px",
                        height: "50px",
                        marginLeft: "100px",
                        marginTop: "10px",
                      }}
                    >
                      Delete Account
                    </button>
                  </div>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      Signout
                    </p>
                    <p className="catDesc">
                      This will sign you out from this device.
                    </p>
                    <button
                      className="standardButton"
                      style={{
                        width: "300px",
                        height: "50px",
                        marginLeft: "100px",
                        marginTop: "10px",
                      }}
                    >
                      Signout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>
        {`
          .main {
            display: flex;
            justify-content: space-evenly;
            flex-direction: row;
          }

          .row {
            display: flex;
            justify-content: center;
            flex-direction: row;
            text-align: center;
          }

          .sidebar {
            position: fixed;
            margin-top: 8vh;
            margin-left: -800px;
          }

          .settings {
            margin-left: 100px;
          }

          .sideItem {
            font-family: var(--mainfont);
            font-weight: 600;
            font-size: 1.7em;
          }

          .sideItemN {
            font-family: var(--mainfont);
            font-weight: 300;
            font-size: 1.3em;
            margin-bottom: 10px;
            cursor: pointer;
          }

          .categoryHeader {
            font-family: var(--mainfont);
            font-weight: 500;
            font-size: 1.7em;
          }

          .cat {
            margin-top: 40px;
          }

          .catHead {
            font-family: var(--mainfont);
            font-weight: 500;
            font-size: 1.4em;
          }

          .catTxt {
            margin-top: 10px;
            font-family: var(--mainfont);
            font-size: 1.24em;
            font-weight: 300;
          }

          .catEdit {
            z-index: 100;
            position: absolute;
            height: 40px;
            margin-left: 500px;
            margin-top: -65px;
            padding-left: 10px;
            padding-right: 10px;
            width: 70px;
          }

          .catDesc {
            margin-top: 14px;
          }

          .switch {
            width: 0;
            height: 0;
            visibility: hidden;
          }

          .switch-label {
            display: block;
            width: 400px;
            height: 150px;
            background-color: #477a85;
            border-radius: 100px;
            position: relative;
            cursor: pointer;
            transition: 0.5s;
            box-shadow: 0 0 20px #477a8550;
            zoom: 0.2;
          }

          .switch-label::after {
            content: "";
            width: 120px;
            height: 120px;
            background-color: #e8f5f7;
            position: absolute;
            border-radius: 70px;
            top: 15px;
            left: 15px;
            transition: 0.5s;
          }

          .switch:checked + .switch-label:after {
            left: calc(100% - 10px);
            transform: translateX(-100%);
          }

          .switch:checked + .switch-label {
            background-color: #243d42;
          }

          .switch-label:active:after {
            width: 160px;
          }
        `}
      </style>
    </>
  );
}
