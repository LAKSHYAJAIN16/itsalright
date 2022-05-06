import React from "react";

export default function Footer() {
  return (
    <div style={{ marginTop: "100px" }}>
      <hr />
      <footer className="main">
        <div className="column">
          <h3>Features</h3>
          <a className="link" href="/share">
            Share
          </a>
          <a className="link" href="/browse">
            Browse
          </a>
          <a className="link" href="/connect-rts/rdirect">
            Connect
          </a>
          <a className="link" href="/contact">
            Contact
          </a>
        </div>

        <div className="column" style={{ marginTop: "-40px" }}>
          <h3>Contact Us</h3>
          <a className="link" href="/report">
            Report User
          </a>
          <a className="link" href="/helpdesk">
            Help Desk
          </a>
          <a className="link" href="/flag">
            Flag Content
          </a>
        </div>

        <div className="column">
          <h3>Company</h3>
          <a className="link" href="/about">
            About
          </a>
          <a className="link" href="/community">
            Community
          </a>
          <a className="link" href="/masthead">
            Masthead
          </a>
          <a className="link" href="/credits">
            Credits
          </a>
        </div>

        <div className="column">
          <h3>Socials</h3>
          <a
            className="link"
            href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          >
            Twitter
          </a>
          <a
            className="link"
            href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          >
            Facebook
          </a>
          <a
            className="link"
            href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          >
            Youtube
          </a>
          <a
            className="link"
            href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          >
            Github
          </a>
        </div>
      </footer>

      <br />
      <div className="sub-footer">
        <div className="logo">
          <p className="logoText">itsalright</p>
          <p style={{ marginTop: "10px", zoom: 0.8, display: "flex" }}>
            Copyright © 2022 Lakshya Jain. All rights reserved.
            <div className="status" style={{ marginTop: "-10px" }}>
              Status : <span style={{ color: "green" }}>All Systems Fine</span>
            </div>
            <div
              className="donate redButton"
              style={{ marginTop: "-10px", paddingTop: "10px" }}
              onClick={() =>
                window.location.replace(
                  "https://www.youtube.com/watch?v=xvFZjo5PgG0"
                )
              }
            >
              Donate ❤️
            </div>
          </p>
        </div>
      </div>
      <br />
      <style jsx>
        {`
          .main {
            display: flex;
            align-items: center;
            justify-content: center;
            zoom: 0.7;
            font-family: var(--mainfont);
            padding-bottom: 10px;
          }

          .logoText {
            font-weight: 500;
            font-family: var(--logofont);
            font-size: 2.4em;
          }

          .column {
            font-family: var(--mainfont);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 200px;
          }

          .link {
            font-family: var(--mainfont);
            cursor: pointer;
            color: #4d5354;
            text-decoration: none;
            font-size: 1.3em;
            font-family: var(--mainfont);
            margin-top: 10px;
            transition : 500ms all ease;
          }

          .link:hover {
            color : black;
          }

          .sub-footer {
            font-family: var(--mainfont);
            display: flex;
            align-items: center;
          }

          .logo {
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-left: 30px;
          }

          .status {
            font-family: var(--mainfont);
            margin-left: 200px;
            width: 200px;
            height: 50px;
            padding: 10px 10px 10px 10px;
            padding-bottom : 0px !important;
            border-radius: 25px;
            border: 2px solid green;
            zoom: 0.9;
          }

          .donate {
            font-family: var(--mainfont);
            margin-left: 200px;
          }

          h3 {
            font-family: var(--mainfont);
            zoom: 1.2;
            font-weight : 500;
          }

          @media screen and (max-width : 910px) {
            .main {
              zoom : 0.6;
            }

            .sub-footer {
              zoom : 0.9;
            }
          }

          @media screen and (max-width : 782px) {
            .main {
              zoom : 0.5;
            }

            .sub-footer {
              zoom : 0.8;
            }
          }

          @media screen and (max-width : 691px) {
            .main {
              zoom : 0.4;
            }

            .sub-footer {
              zoom : 0.7;
            }
          }

          @media screen and (max-width : 605px) {
            .main {
              zoom : 0.35;
            }

            .sub-footer {
              zoom : 0.6;
            }
          }

          @media screen and (max-width : 528px) {
            .main {
              flex-wrap : wrap;
              justify-content : space-evenly;
              zoom : 0.7;
            }

            .column {
              margin-bottom : 30px;
              margin-right : 0px;
            }

            .sub-footer {
              margin-top : -10px;
            }

            .donate {
              display : none;
            }

            .status {
              display : none; 
            }
          }
        `}
      </style>
    </div>
  );
}
