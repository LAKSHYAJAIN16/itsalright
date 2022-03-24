import React from "react";
import axios from "axios";
import Head from "next/head";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

import { fauth } from "../lib/firebase";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function Login() {
  const login = async (e) => {
    //We hate Reloads
    e.preventDefault();

    //Retrieve Data
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);

    //Send it to backend
    const res = await axios.post("/api/oauth-login", formData);
    console.log(res);

    //Check if it is a success or an error
    if (res.data.authCode === "E1") {
      alert("Error : Invalid Password");
    }
    if (res.data.authCode === "E2") {
      alert("Error : Something weird happened. Try again");
    }
    if (res.data.authCode === "E3") {
      alert("Error : There is no user with that email. Maybe a typo?");
    }
    if (res.data.authCode === "S1") {
      //Set LocalStorage
      const ISSERVER = typeof window === "undefined";
      if (!ISSERVER) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("logged", JSON.stringify(true));
        sessionStorage.setItem("logged", JSON.stringify(true));
      }

      //Send Notification EMAIL
      await axios.get(`/api/email/login?m=${formData.email}`);

      //Redirect to dashboard
      window.location.replace("/home");
    }
  };

  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(fauth, provider)
      .then(async (result) => {
        //The signed-in user info.
        const user = result.user;

        //Assemble Data
        const assembled = {
          username: user.displayName,
          email: user.email,
          password: user.uid,
          isExpert: false,
        };

        //API
        const res = await axios.post("/api/facebook-oauth", assembled);

        //Set LocalStorage
        const ISSERVER = typeof window === "undefined";
        if (!ISSERVER) {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          sessionStorage.setItem("user", JSON.stringify(res.data.data));
          localStorage.setItem("logged", JSON.stringify(true));
          sessionStorage.setItem("logged", JSON.stringify(true));
        }

        //Send Notification EMAIL
        await axios.get(`/api/email/signup?m=${assembled.email}`);

        //Redirect to dashboard
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/popup-closed-by-user") {
          return;
        } else if (errorCode !== "auth/popup-closed-by-user") {
          alert(errorMessage);
        }
      });
  };

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <Meta title={"Login"} desc={"Login to Itsalright"} />
      <div className="main">
        <Navbar />
        <div className="center">
          <h2 className="signup">Login</h2>
          <hr />
          <form className="form" onSubmit={login}>
            <div className="field">
              <input
                type="text"
                required
                placeholder=""
                name="email"
                className="input"
              />
              <span className="span"></span>
              <label htmlFor="email" className="label">
                Email
              </label>
            </div>

            <div className="field">
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
            <a href="/forgot-password">
              <p
                style={{ zoom: 0.8, marginTop: "-25px", marginBottom: "10px" }}
              >
                Forgot Your Password?
              </p>
            </a>

            <button className="standardButton signupButton" type="submit">
              Login
            </button>

            <p className="or" style={{ marginTop: "10px" }}>
              or
            </p>

            <button
              type="button"
              className="facebookButtonBI"
              style={{ marginTop: "10px" }}
              onClick={() => facebookLogin()}
            >
              <i className="bx bxl-facebook facebookIconBI"></i>
              Continue With Facebook
            </button>
            <p style={{ zoom: 0.9, textAlign: "center" }}>
              Don't have an account? <a href="/signup">Signup</a>
            </p>
            <br />
          </form>
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

          @media screen and (max-width : 448px) {
            .center {
              zoom : 0.9;
            }
          }

          @media screen and (max-width : 407px) {
            .center {
              zoom : 0.8;
            }
          }

          @media screen and (max-width : 326px) {
            .center {
              zoom : 0.7;
            }
          }
        `}
      </style>
    </>
  );
}
