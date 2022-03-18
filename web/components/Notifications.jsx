import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import Head from "next/head";
import { collection, onSnapshot } from "firebase/firestore";

import NotificationManager from "../lib/NotificationManager";
import { db } from "../lib/firebase";

export default function Notifications() {
  const [manager, setManager] = useState(null);
  const [render, setRender] = useState(false);
  const [messages, setMessages] = useState([]);

  const add = (notification) => {
    setRender(false);
    const temp_messages = messages;
    temp_messages.push(notification);
    setMessages(temp_messages);
    setRender(true);
  };

  const sub = () => {};

  useEffect(() => {
    NotificationManager.register(add, sub);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "").isExpert;
      console.log(user);
      if (user === true) {
        //Register Snap Listner
        const snapListner = onSnapshot(
          collection(db, "available-calls"),
          (col) => {
            //Check Doc Changes. If a new Call was created, notify expert
            col.docChanges().forEach((change) => {
              if (
                change.type === "added" &&
                change.doc.data().assigned === false
              ) {
                NotificationManager.addNotification(
                  `${
                    change.doc.data().creator.name
                  } wants to connect with you! Go to the Connect Panel and check it out!`,
                  "Someone wants to connect with you",
                  "blue"
                );
              }
            });
          }
        );
      }
    }
    catch(err){
      //No User Logged In
    }
  }, []);

  const Notification = ({ data }) => {
    const [show, setShow] = useState(true);
    return (
      <>
        <Toast
          style={{ marginTop: "14px" }}
          show={show}
          onClose={() => setShow(!show)}
        >
          <Toast.Header>
            {/* <img
              src={`/${data.color}.jpg`}
              alt="image"
              aria-label="image"
              style={{
                borderRadius: "3px",
                height: "15px",
                width: "15px",
                marginRight: "10px",
              }}
            ></img> */}
            <strong className="me-auto">
              {"    "} {data.title}
            </strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{data.text}</Toast.Body>
        </Toast>
      </>
    );
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="wrapper">
        {render && (
          <>
            {messages.map((data, idx) => (
              <div key={idx}>
                <Notification data={data} />
              </div>
            ))}
          </>
        )}
      </div>
      <style jsx>
        {`
          .wrapper {
            position: fixed;
            bottom: 0;
            z-index: 99;
          }
        `}
      </style>
    </>
  );
}
