import React from "react";
import Head from "next/head";
import axios from "axios";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

import { fauth } from "../lib/firebase";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function signup() {
  const signup = async (event) => {
    //Prevent Reload
    event.preventDefault();

    //Retrieve Data
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    //Create new Data object
    const newData = {
      ...formData,
      isExpert: false,
    };

    //API
    const res = await axios.post("/api/createUser", newData);

    //Set LocalStorage
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      sessionStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("logged", JSON.stringify(true));
      sessionStorage.setItem("logged", JSON.stringify(true));
    }

    //Send Notification EMAIL
    await axios.get(`/api/email/signup?m=${formData.email}`);

    //Redirect to dashboard
    window.location.replace("/dashboard");
  };

  const facebookSignup = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(fauth, provider)
      .then(async(result) => {
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
    <div>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <Meta title={"Signup"} desc={"Signup to Itsalright"}/>
      <div className="main">
        <Navbar />
        <div className="center">
          <h2 className="signup" style={{fontWeight:"300"}}>Signup</h2>
          <p className="expert-signup">
            If you are an expert (a doctor, motivational speaker, etc.)
            <br />
            you can sign up on the <a href="expert-signup">
              expert signup
            </a>{" "}
            page
          </p>
          <hr />
          <form className="form" onSubmit={signup}>
            <div className="field">
              <input
                type="text"
                required
                placeholder=""
                name="username"
                className="input"
              />
              <span className="span"></span>
              <label htmlFor="username" className="label">
                Username
              </label>
            </div>

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

            <p
              style={{
                fontSize: "0.55em",
                textAlign: "center",
                marginTop: "-5px",
              }}
            >
              By Clicking Signup, you adhere to our{" "}
              <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">terms and conditions</a>
            </p>
            <button className="standardButton signupButton" type="submit">
              Signup
            </button>

            <p className="or" style={{ marginTop: "10px" }}>
              or
            </p>

            <button
              type="button"
              className="facebookButtonBI"
              style={{ marginTop: "10px" }}
              onClick={() => facebookSignup()}
            >
              <i className="bx bxl-facebook facebookIconBI"></i>
              Continue With Facebook
            </button>
            
            <p style={{ zoom: 0.9, textAlign: "center" }}>
              Have an account? <a href="/login">Login</a>
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
            font-family : var(--mainfont);
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

          @media screen and (max-width : 440px) {
            .center {
              zoom : 0.9;
            }
          }
          
          @media screen and (max-width : 392px) {
            .center {
              zoom : 0.8;
            }
          }

          @media screen and (max-width : 346px) {
            .center {
              zoom : 0.7;
            }
          }
        `}
      </style>
    </div>
  );
}
