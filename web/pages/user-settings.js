import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Procrastinator from "../components/Procrastinator";
import Navbar from "../components/Navbar";

export default function UserSettings() {
  //UI variables
  const [pass, setPass] = useState(false);
  const [d, setD] = useState({});
  const profile = useRef();
  const notifications = useRef();
  const ef = useRef();
  const auth = useRef();
  const api = useRef();
  const danger = useRef();

  //Edit States
  const [eName, setEName] = useState(false);
  const [eEmail, setEEmail] = useState(false);
  const [eNEmail, setENEmail] = useState(false);
  const [eExProf, setEExProf] = useState(false);
  const [eExBio, setEExBio] = useState(false);
  const [eExSocial, setEExSocial] = useState(false);
  const [rUID, setRUID] = useState(false);
  const [rAPIKey, setRAPIKey] = useState(false);
  const [rOAuthKey, setROAuthKey] = useState(false);

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

  const edit = async (fieldName, value, hook) => {
    setPass(false);

    //Send Axios request
    const res = await axios.post("/api/update-settings", {
      fieldName,
      value,
      id: d.id,
    });
    console.log(res);

    //Update Field in D Object
    const temp_d = d;
    d[fieldName] = value;

    //Update Cache
    const user = JSON.parse(localStorage.getItem("user") || "");
    user[fieldName] = value;
    localStorage.setItem("user", JSON.stringify(user));

    //Update all states
    setD(temp_d);
    hook(false);
    setPass(true);
  };

  const editNested = async (nestedName, fieldName, value, hook) => {
    setPass(false);

    //Send Axios request
    const res = await axios.post("/api/update-nested-settings", {
      nestedName,
      fieldName,
      value,
      id: d.id,
    });
    console.log(res);

    //Update Field in D Object
    const temp_d = d;
    d[nestedName][fieldName] = value;

    //Update Cache
    const user = JSON.parse(localStorage.getItem("user") || "");
    user[nestedName][fieldName] = value;
    localStorage.setItem("user", JSON.stringify(user));

    //Update all states
    setD(temp_d);
    hook(false);
    setPass(true);
  };

  const editBool = async (nestedName, fieldName, value) => {
    //Send Axios request
    const res = await axios.post("/api/update-nested-settings", {
      nestedName,
      fieldName,
      value,
      id: d.id,
    });
    console.log(res);

    //Update Field in D Object
    const temp_d = d;
    d[nestedName][fieldName] = value;

    //Update Cache
    const user = JSON.parse(localStorage.getItem("user") || "");
    user[nestedName][fieldName] = value;
    localStorage.setItem("user", JSON.stringify(user));

    //Update all states
    setD(temp_d);
  };

  const editSingleBool = async (fieldName, value) => {
    //Send Axios request
    const res = await axios.post("/api/update-settings", {
      fieldName,
      value,
      id: d.id,
    });
    console.log(res);

    //Update Field in D Object
    const temp_d = d;
    d[fieldName] = value;

    //Update Cache
    const user = JSON.parse(localStorage.getItem("user") || "");
    user[fieldName] = value;
    localStorage.setItem("user", JSON.stringify(user));

    //Update all states
    setD(temp_d);
  };

  const updateProfilePic = async (file) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cdkq7wce");

      setPass(false);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/everything-limited/auto/upload",
        formData
      );
      setPass(true);

      edit("profilePic", res.data.url, function () {
        console.log("UPLOADED IMAGE TO CLOUD");
      });
    }
  };

  const signout = () => {
    localStorage.clear();
    window.location.replace("/home");
  };

  const delAccount = async () => {
    setPass(false);
    await axios.post("/api/delAccount", { id: d.id });
    localStorage.clear();
    setPass(true);
    window.location.replace("/home");
  };

  const exitExpertProgram = async () => {
    setPass(false);
    await axios.post("/api/exitExpertProgram", { id: d.id });
    const dat = d;
    d.isExpert = false;
    setD(dat);
    localStorage.setItem("user", JSON.stringify(d));
    setPass(true);
    window.location.reload();
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
                {/* Profile */}
                <div className="category" ref={profile}>
                  <p className="categoryHeader">Profile</p>
                  <div className="cat">
                    <p className="catHead">Name</p>
                    {eName === false ? (
                      <>
                        <p className="catTxt">{d.name}</p>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setEName(true)}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="greenButton catSave"
                          onClick={() =>
                            edit(
                              "name",
                              document.getElementById("eN").value,
                              setEName
                            )
                          }
                        >
                          Save
                        </button>
                        <button
                          className="redButton catCancel"
                          onClick={() => setEName(false)}
                        >
                          Cancel
                        </button>
                        <input
                          defaultValue={d.name}
                          className="catTxt"
                          id="eN"
                        ></input>
                      </>
                    )}
                    <p className="catDesc">
                      This will be visible when you comment, share or connect.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Email</p>
                    {eEmail === false ? (
                      <>
                        <p className="catTxt">{d.email}</p>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setEEmail(true)}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="greenButton catSave"
                          onClick={() =>
                            edit(
                              "email",
                              document.getElementById("eE").value,
                              setEEmail
                            )
                          }
                        >
                          Save
                        </button>
                        <button
                          className="redButton catCancel"
                          onClick={() => setEEmail(false)}
                        >
                          Cancel
                        </button>
                        <input
                          defaultValue={d.email}
                          className="catTxt"
                          id="eE"
                        ></input>
                      </>
                    )}
                    <p className="catDesc">
                      This will be visible when you comment, share or connect.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead">Profile Picture</p>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="fileInput"
                      accept="image/png, image/jpeg, image/gif"
                      onChange={(e) => updateProfilePic(e.target.files[0])}
                    ></input>
                    <label
                      htmlFor="fileInput"
                      className="standardButton catEdit"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Edit
                    </label>
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
                {/* Notifications */}
                <div className="category" ref={notifications}>
                  <p className="categoryHeader">Notifications</p>
                  <div className="cat">
                    <p className="catHead">Notification Email</p>
                    {eNEmail === false ? (
                      <>
                        <p className="catTxt">{d.notifications.nEmail}</p>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setENEmail(true)}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="greenButton catSave"
                          onClick={() =>
                            editNested(
                              "notifications",
                              "nEmail",
                              document.getElementById("eNe").value,
                              setENEmail
                            )
                          }
                        >
                          Save
                        </button>
                        <button
                          className="redButton catCancel"
                          onClick={() => setENEmail(false)}
                        >
                          Cancel
                        </button>
                        <input
                          defaultValue={d.notifications.nEmail}
                          className="catTxt"
                          id="eNe"
                        ></input>
                      </>
                    )}
                    <p className="catDesc">
                      This is used for newsletters, security notifications,
                      comment notifications, etc.
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
                        defaultChecked={d.notifications.newsletters}
                        onChange={(e) =>
                          editBool(
                            "notifications",
                            "newsletters",
                            e.target.checked
                          )
                        }
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
                        defaultChecked={d.notifications.comment}
                        onChange={(e) =>
                          editBool("notifications", "comment", e.target.checked)
                        }
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
                      <input
                        type="checkbox"
                        id="rm"
                        className="switch"
                        defaultChecked={d.notifications.message}
                        onChange={(e) =>
                          editBool("notifications", "message", e.target.checked)
                        }
                      ></input>
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
                      <input
                        type="checkbox"
                        id="sn"
                        className="switch"
                        defaultChecked={d.notifications.security}
                        onChange={(e) =>
                          editBool(
                            "notifications",
                            "security",
                            e.target.checked
                          )
                        }
                      ></input>
                      <label htmlFor="sn" className="switch-label"></label>
                    </p>
                  </div>
                </div>

                <br />
                <br />
                <br />
                {/* Expert Features */}
                <div className="category" ref={ef}>
                  <p className="categoryHeader">Expert Features</p>
                  {d.isExpert ? (
                    <>
                      <div className="cat">
                        <p className="catHead">Profession</p>
                        {eExProf === false ? (
                          <>
                            <p className="catTxt">{d.expertData.profession}</p>
                            <button
                              className="standardButton catEdit"
                              onClick={() => setEExProf(true)}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="greenButton catSave"
                              onClick={() =>
                                editNested(
                                  "expertData",
                                  "profession",
                                  document.getElementById("exProf").value,
                                  setEExProf
                                )
                              }
                            >
                              Save
                            </button>
                            <button
                              className="redButton catCancel"
                              onClick={() => setEExProf(false)}
                            >
                              Cancel
                            </button>
                            <input
                              defaultValue={d.expertData.profession}
                              className="catTxt"
                              id="exProf"
                            ></input>
                          </>
                        )}
                        <p className="catDesc">
                          This will be visible when someone will try to contact
                          you.
                        </p>
                      </div>

                      <div className="cat">
                        <p className="catHead">Bio</p>
                        {eExBio === false ? (
                          <>
                            <p className="catTxt">{d.expertData.bio}</p>
                            <button
                              className="standardButton catEdit"
                              onClick={() => setEExBio(true)}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="greenButton catSave"
                              onClick={() =>
                                editNested(
                                  "expertData",
                                  "bio",
                                  document.getElementById("exBio").value,
                                  setEExBio
                                )
                              }
                            >
                              Save
                            </button>
                            <button
                              className="redButton catCancel"
                              onClick={() => setEExBio(false)}
                            >
                              Cancel
                            </button>
                            <input
                              defaultValue={d.expertData.bio}
                              className="catTxt"
                              id="exBio"
                            ></input>
                          </>
                        )}
                        <p className="catDesc">
                          This will be visible when someone will try to contact
                          you.
                        </p>
                      </div>

                      <div className="cat">
                        <p className="catHead">Social Media</p>
                        {eExSocial === false ? (
                          <>
                            <p className="catTxt">{d.expertData.socialmedia}</p>
                            <button
                              className="standardButton catEdit"
                              onClick={() => setEExSocial(true)}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="greenButton catSave"
                              onClick={() =>
                                editNested(
                                  "expertData",
                                  "socialmedia",
                                  document.getElementById("exSm").value,
                                  setEExSocial
                                )
                              }
                            >
                              Save
                            </button>
                            <button
                              className="redButton catCancel"
                              onClick={() => setEExSocial(false)}
                            >
                              Cancel
                            </button>
                            <input
                              defaultValue={d.expertData.socialmedia}
                              className="catTxt"
                              id="exSm"
                            ></input>
                          </>
                        )}
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
                          onClick={() => exitExpertProgram()}
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
                {/* Authentication */}
                <div className="category" ref={auth}>
                  <p className="categoryHeader">Authentication</p>
                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      UserID
                    </p>
                    <p className="catTxt">
                      <em>{rUID === true ? d.id : "Reveal User ID"}</em>
                    </p>
                    {rUID === false ? (
                      <>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setRUID(true)}
                        >
                          Reveal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setRUID(false)}
                        >
                          Hide
                        </button>
                      </>
                    )}
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
                        defaultChecked={d.twofa}
                        onChange={(e) =>
                          editSingleBool("twofa", e.target.checked)
                        }
                      ></input>
                      <label htmlFor="2fa" className="switch-label"></label>
                    </p>
                  </div>
                </div>

                <br />
                <br />
                <br />
                {/* API */}
                <div className="category" ref={api}>
                  <p className="categoryHeader">API and Integration</p>
                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      API Key
                    </p>
                    <p className="catTxt">
                      <em>{rAPIKey === true ? d.apiKey : "Reveal API key"}</em>
                    </p>
                    {rAPIKey === false ? (
                      <>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setRAPIKey(true)}
                        >
                          Reveal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setRAPIKey(false)}
                        >
                          Hide
                        </button>
                      </>
                    )}
                    <p className="catDesc">
                      This is your API Key. This can be used for accessing our
                      API features.
                    </p>
                  </div>

                  <div className="cat">
                    <p className="catHead" style={{ color: "red" }}>
                      OAuth Key
                    </p>
                    <p className="catTxt">
                      <em>
                        {rOAuthKey === true ? d.oauthKey : "Reveal OAuth key"}
                      </em>
                    </p>
                    {rOAuthKey === false ? (
                      <>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setROAuthKey(true)}
                        >
                          Reveal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="standardButton catEdit"
                          onClick={() => setROAuthKey(false)}
                        >
                          Hide
                        </button>
                      </>
                    )}
                    <p className="catDesc">
                      This is your OAuth Key. This can be used for accessing our
                      API features.
                    </p>
                  </div>
                </div>

                <br />
                <br />
                <br />
                {/* Danger */}
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
                      onClick={() => delAccount()}
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
                      onClick={() => signout()}
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

          .catSave {
            z-index: 100;
            position: absolute;
            height: 40px;
            margin-left: 500px;
            margin-top: -25px;
            padding-left: 10px;
            padding-right: 10px;
            width: 70px;
          }

          .catCancel {
            z-index: 100;
            position: absolute;
            height: 40px;
            margin-left: 580px;
            margin-top: -25px;
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

          @media screen and (max-width : 1025px) {
            .sidebar {
              display : none;
            }
          }

          @media screen and (max-width : 670px) {
            .settings {
              margin-left : 50px;
            }
          }

          @media screen and (max-width : 630px) {
            .settings {
              margin-left : 20px;
            }
          }

          @media screen and (max-width : 584px) {
            .settings {
              zoom : 0.9;
            }
          }

          @media screen and (max-width : 543px) {
            .settings {
              zoom : 0.8;
            }
          }

          @media screen and (max-width : 479px) {
            .settings {
              zoom : 0.7;
            }
          }

          @media screen and (max-width : 418px) {
            .settings {
              zoom : 0.6;
            }
          }

          @media screen and (max-width : 367px) {
            .settings {
              zoom : 0.5;
            }
          }

          @media screen and (max-width : 285px) {
            .settings {
              zoom : 0.4;
            }
          }
        `}
      </style>
    </>
  );
}
