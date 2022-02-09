import React from "react";
import Head from "next/head";
import axios from "axios";

import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";

export default function ChatRoom(context) {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <title>Chat with {context.data.name} on itsalright</title>
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
            <br />
            <p className="sub">
              {context.data.name} will recieve a notification as soon as you
              send a message.
            </p>
            <p className="sub">
              According to the <a href="/guidelines/expert">expert guidlines</a>
              , if an expert does not respond within 72 hours,
            </p>
            <p className="sub" style={{ textAlign: "center" }}>
              he/she will be stripped of the expert rank.
            </p>
            <br />
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
        `}
      </style>
    </>
  );
}

export async function getServerSideProps(context) {
  //Get the Query id
  const id = context.query.id;

  try {
    //Call Backend (temporary with the localhost thing)
    const res = await axios.get("http://localhost:1696/api/user/" + id);
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