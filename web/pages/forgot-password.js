import React, { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  const [ui, setUi] = useState(0);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [done3, setDone3] = useState(false);
  const [done4, setDone4] = useState(false);
  const [done5, setDone5] = useState(false);

  const requestOTP = async (e, email) => {
    e.preventDefault();

    //Send Request to backend API
    const res = await axios.post("/api/fp", { email: email });
    console.log(res);

    if (res.data.authCode === "E3") {
      alert("Could not find any user with that email. Maybe a typo?");
    } else if (res.data.authCode === "S1") {
      setOtp(res.data.otp);
      setEmail(email);
      setUi(1);
    }
  };

  const validateOTP = async (e) => {
    //Prevent Reload
    e.preventDefault();

    //Retrieve Data
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    //Create final OTP
    const finalOTP =
      formData["1"] +
      formData["2"] +
      formData["3"] +
      formData["4"] +
      formData["5"] +
      formData["6"];

    //CLG it
    console.log(finalOTP);

    //Check if it matches
    if (finalOTP === otp) {
      setUi(2);
    }
    else {
      alert("OTP doesn't match")
    }
  };

  const updatePass = async (e) => {
    //Prevent Reload
    e.preventDefault();

    //Retrieve Data
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    //Confirm Passwords
    if (formData.cPassword === formData.password) {
      //Communicate to Backend
      const res = await axios.post("/api/cnp", {
        email: email,
        password: formData.password,
      });

      //Set LocalStorage
      const ISSERVER = typeof window === "undefined";
      if (!ISSERVER) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("logged", JSON.stringify(true));
        sessionStorage.setItem("logged", JSON.stringify(true));
      }

      //Redirect to dashboard
      window.location.replace("/dashboard");
    } else {
      alert("Both Passwords need to match");
    }
  };

  const autoFocus = (e) => {
    if (e.target.id === "1" && done1 === false) {
      document.getElementById("2").focus();
      setDone1(true);
    }
    if (e.target.id === "2" && done2 === false) {
      document.getElementById("3").focus();
      setDone2(true);
    }
    if (e.target.id === "3" && done3 === false) {
      document.getElementById("4").focus();
      setDone3(true);
    }
    if (e.target.id === "4" && done4 === false) {
      document.getElementById("5").focus();
      setDone4(true);
    }
    if (e.target.id === "5" && done5 === false) {
      document.getElementById("6").focus();
      setDone5(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="center">
          <h2 className="signup" style={{ fontSize: "2.5em" }}>
            Password Reset
          </h2>
          <hr />
          {ui === 0 && (
            <>
              <form
                className="form"
                onSubmit={(e) =>
                  requestOTP(
                    e,
                    Object.fromEntries(new FormData(e.target).entries()).email
                  )
                }
              >
                <p>Enter the email associated to your account</p>

                <div
                  className="field"
                  style={{ marginTop: "20px", marginLeft: "-5px" }}
                >
                  <input
                    type="text"
                    required
                    placeholder=""
                    name="email"
                    className="input"
                  />
                  <span className="span"></span>
                  <label htmlFor="email" className="label">
                    Your Email
                  </label>
                </div>

                <button
                  className="standardButton"
                  style={{ marginLeft: "8vw" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </>
          )}

          {ui === 1 && (
            <form onSubmit={validateOTP}>
              <p style={{ textAlign: "center" }}>
                Enter the OTP we sent to your email
              </p>
              <br />

              <div className="otp-inputs">
                <input
                  className="otp-input"
                  id="1"
                  name="1"
                  required
                  onKeyUp={(e) => autoFocus(e)}
                ></input>
                <input
                  className="otp-input"
                  id="2"
                  name="2"
                  required
                  onKeyUp={(e) => autoFocus(e)}
                ></input>
                <input
                  className="otp-input"
                  id="3"
                  name="3"
                  required
                  onKeyUp={(e) => autoFocus(e)}
                ></input>
                <input
                  className="otp-input"
                  id="4"
                  name="4"
                  required
                  onKeyUp={(e) => autoFocus(e)}
                ></input>
                <input
                  className="otp-input"
                  id="5"
                  name="5"
                  required
                  onKeyUp={(e) => autoFocus(e)}
                ></input>
                <input
                  className="otp-input"
                  id="6"
                  name="6"
                  required
                  onKeyUp={(e) => autoFocus(e)}
                ></input>
              </div>

              <br />
              <button className="standardButton" style={{ marginLeft: "11vw" }}>
                Validate
              </button>
            </form>
          )}

          {ui === 2 && (
            <form onSubmit={updatePass} className="form">
              <p style={{ textAlign: "center" }}>Create a New Password</p>
              <br />

              <div className="field" style={{ marginTop: "20px" }}>
                <input
                  type="password"
                  required
                  placeholder=""
                  name="password"
                  className="input"
                />
                <span className="span"></span>
                <label htmlFor="password" className="label">
                  Password
                </label>
              </div>

              <div className="field" style={{ marginTop: "20px" }}>
                <input
                  type="password"
                  required
                  placeholder=""
                  name="cPassword"
                  className="input"
                />
                <span className="span"></span>
                <label htmlFor="password" className="label">
                  Confirm Password
                </label>
              </div>

              <br />
              <button className="standardButton" style={{ marginLeft: "8vw" }}>
                Update
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>
        {`
          .center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          }

          .signup {
            text-align: center;
            font-size: 55px;
            padding: 10px 0;
          }

          .expert-signup {
            font-size: 0.65em;
            width: 100%;
            text-align: center;
          }

          .form {
            padding: 0 40px;
            box-sizing: border-box;
          }

          .field {
            position: relative;
            border-bottom: 2px dashed #adadad;
            margin: 30px 0;
            zoom: 0.8;
          }

          .input {
            width: 100%;
            padding: 0 5px;
            height: 40px;
            font-size: 16px;
            border: none;
            background: none;
            outline: none;
          }

          .label {
            position: absolute;
            top: 50%;
            left: 5px;
            color: #adadad;
            transform: translateY(-50%);
            font-size: 16px;
            pointer-events: none;
            transition: 0.5s;
          }

          .span::before {
            content: "";
            position: absolute;
            top: 40px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #2691d9;
            transition: 0.5s;
          }

          .input:focus ~ .label,
          .input:valid ~ .label {
            top: -5px;
            color: #2691d9;
          }

          .input:focus ~ .span::before,
          .input:valid ~ .span::before {
            width: 100%;
          }

          .signupButton {
            margin-left: 60px;
            width: 200px;
          }

          .or {
            text-align: center;
          }

          .otp-inputs {
            display: flex;
            justify-content: space-evenly;
          }

          .otp-input {
            width: 50px;
            height: 50px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border: none;
            outline: none;
            text-align: center;
            font-family: var(--mainfont);
            font-size: 1.2em;
          }
        `}
      </style>
    </>
  );
}
