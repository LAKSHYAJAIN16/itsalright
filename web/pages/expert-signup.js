import React from "react";
import axios from "axios";

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function ExpertSignup() {
  const submit = async (event) => {
    //Prevent Reload
    event.preventDefault();

    //Retrieve Data
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    //Create Data Object
    const data = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      expertData: {
        why: formData.why,
        profession: formData.profession,
        bio: formData.bio,
        socialmedia: formData.socialmedia,
      },
    };

    //Send to backend
    const res = await axios.post("/api/createExpert", data);

    //Set LocalStorage
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      sessionStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("logged", JSON.stringify(true));
      sessionStorage.setItem("logged", JSON.stringify(true));
    }

    //Send Notification EMAIL
    await axios.get(`/api/email/expert-signup?m=${formData.email}`);

    //Re-route
    window.location.replace("/callbacks/post-expert");
  };

  return (
    <div>
      <Meta
        title={"Expert Signup"}
        desc={"Signup as an expert on Itsalright"}
      />
      <Navbar />

      <div className="center">
        <h2 className="signup">Expert Signup</h2>
        <hr />

        <form className="form" onSubmit={submit}>
          <div className="row">
            <div className="field">
              <span>
                Username <span className="required">*</span>
              </span>
              <input className="input" type="text" required name="name"></input>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <span>
                Email <span className="required">*</span>
              </span>
              <input
                className="input"
                type="email"
                required
                name="email"
                style={{ marginLeft: "43px" }}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <span>
                Password <span className="required">*</span>
              </span>
              <input
                className="input"
                type="password"
                required
                name="password"
                style={{ marginLeft: "15px" }}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <span>
                Profession <span className="required">*</span>
              </span>
              <select name="profession" className="input" required>
                <option>Teacher</option>
                <option>Counselor</option>
                <option>Doctor</option>
                <option>Therapist</option>
                <option>Motivational Speaker</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <span>Short Bio</span>
              <input
                className="input"
                type="text"
                name="bio"
                placeholder=""
                style={{ marginLeft: "30px", width: "400px" }}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <span>Social Media</span>
              <input
                className="input"
                type="text"
                name="socialmedia"
                style={{ marginLeft: "5px", width: "200px" }}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <br />
              <span>Why do you want to be an Expert ?</span>
              <textarea
                className="input"
                type="text"
                name="why"
                placeholder=""
                style={{ marginLeft: "0px", width: "400px" }}
              ></textarea>
            </div>
          </div>

          <br />
          <button className="standardButton signupButton" type="submit">
            Signup
          </button>
        </form>
      </div>

      <style jsx>
        {`
          .center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            background: white;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          }

          .signup {
            text-align: center;
            padding: 10px 0;
          }

          .form {
            padding: 0 40px;
            box-sizing: border-box;
          }

          .row {
            margin-top: 10px;
          }

          .input {
            margin-left: 10px;
          }

          .required {
            color: red;
          }

          .signupButton {
            margin-left: 200px;
          }

          @media screen and (max-width : 661px) {
            .center {
              zoom : 0.9;
            }
          }

          @media screen and (max-width : 552px) {
            .center {
              zoom : 0.8;
            }
          }
          
          @media screen and (max-width : 503px) {
            .center {
              zoom : 0.7;
            }
          }

          @media screen and (max-width : 433px) {
            .center {
              zoom : 0.6;
            }
          }

          @media screen and (max-width : 367px) {
            .center {
              zoom : 0.5;
            }
          }
        `}
      </style>
    </div>
  );
}
