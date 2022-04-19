import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";

import Meta from "../../components/Meta";
import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";

export default function ChatRoom(context) {
  useEffect(() => {
    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/login");
    }
  }, []);

  return (
    <>
      <Head>
        {/* No Meta due to dynamicness */}
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <title>{`Chat with ${context.data.name}`}</title>
        <meta name="description">{`Chat with ${context.data.name} on Itsalright`}</meta>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="main">
          <div className="profile">
            <img
              src={context.data.profilePic}
              className="profilePic"
              alt="profile_pic"
              aria-label="profile_pic"
            ></img>
            <p className="name">Chat with {context.data.name}</p>
            <a href="/contact">
              <button className="standardButton exit">Exit</button>
            </a>
            <br />
            <p className="sub">
              {context.data.name} will recieve a notification as soon as you
              send a message.
            </p>
            <p className="sub">
              We make sure each problem gets resolved at{" "}
              <span style={{ fontFamily: "var(--logofont)" }}>itsalright</span>.
            </p>
          </div>

          <div className="chat">
            <Chat reciever={context.data} />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .main {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .profile {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          .profilePic {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }

          .name {
            margin-top: 10px;
            font-size: 1.25em;
            font-family: var(--mainfont);
          }

          .sub {
            font-size: 0.8em;
            font-family: var(--mainfont);
          }

          .exit {
            margin-top: 20px !important;
            zoom: 0.8;
          }

          @media screen and (max-width: 1200px) {
            .chat {
              zoom: 0.9;
            }
          }

          @media screen and (max-width: 1088px) {
            .chat {
              zoom: 0.8;
            }
          }

          @media screen and (max-width: 1023px) {
            .profile {
              zoom: 0.9;
            }
          }

          @media screen and (max-width: 975px) {
            .profile {
              zoom: 0.8;
            }
          }

          @media screen and (max-width: 935px) {
            .profile {
              zoom: 0.7;
            }
          }

          @media screen and (max-width: 886px) {
            .main {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              zoom: 1;
              margin-left: -20px;
            }

            .profile {
              zoom: 1;
              margin-left: 50px;
              margin-bottom: 20px;
            }

            .chat {
              zoom: 1;
              margin-left: -5vw;
            }
          }

          @media screen and (max-width: 668px) {
            .chat {
              zoom: 0.9;
            }
          }

          @media screen and (max-width: 618px) {
            .chat {
              zoom: 0.8;
            }
          }

          @media screen and (max-width: 548px) {
            .profile {
              zoom: 0.9;
            }

            .main {
              margin-left: -40px;
            }
          }

          @media screen and (max-width: 520px) {
            .chat {
              zoom: 0.75;
            }

            .main {
              margin-left: -60px;
            }
          }

          @media screen and (max-width: 480px) {
            .chat {
              zoom: 0.6;
            }

            .profile {
              zoom: 0.6;
            }
          }

          @media screen and (max-width: 383px) {
            .main {
              margin-left: -50px;
            }
          }

          @media screen and (max-width: 364px) {
            .main {
              zoom: 0.8;
            }
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps(context) {
  //Get the Query id
  const id = context.query.id;

  try {
    //Call Backend
    const res = await axios.get("http://itsalright.in/api/user/" + id);
    const data = res.data.data;
    if (data === undefined) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        userID: id,
        data: data,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
