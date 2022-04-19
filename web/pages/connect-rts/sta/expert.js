import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import Meta from "../../../components/Meta";
import NotificationManager from "../../../lib/NotificationManager";
import styles from "../../../styles/Waitroom.module.css";
import cardStyles from "../../../styles/Card.module.css";
import Navbar from "../../../components/Navbar";
import { db } from "../../../lib/firebase";

export default function expert() {
  const [calls, setCalls] = useState([]);

  useEffect(async () => {
    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/login");
    } else if (user) {
      //Get all available calls
      const q = query(
        collection(db, "available-calls"),
        where("assigned", "==", false)
      );
      const avcalls = await getDocs(q);

      //Get that Data
      const temp_av_calls = [];
      avcalls.docs.forEach((document) => {
        temp_av_calls.push(document.data());
      });
      setCalls(temp_av_calls);

      //Register Snapshot listener so we can change in realtime
      const snapListner = onSnapshot(
        collection(db, "available-calls"),
        (col) => {
          //Set Available Calls
          const newCalls = [];
          col.docs.forEach((document) => {
            if (document.data().assigned === false) {
              newCalls.push(document.data());
            }
          });
          setCalls(newCalls);
        }
      );
    }
  }, []);

  const join = async (id, callback) => {
    //Create Doc Reference
    const document = doc(db, "available-calls", id);

    //Get our user
    const user = JSON.parse(localStorage.getItem("user") || "");

    //Update the doc
    await updateDoc(document, {
      assigned: true,
      expert: user,
    });

    //Redirect
    window.location.replace(callback);
  };

  return (
    <>
      <Meta title="Connect to a user" desc="" />
      <Navbar />
      <main>
        <h1 className={styles.head}>Available Calls</h1>
        <p className={styles.connectSub}>
          <b>
            When you click on a call, you will be automatically redirected to
            the call
          </b>
        </p>
        <div className={styles.cardContainer}>
          {calls.map((val, idx) => (
            <div
              key={idx}
              className={cardStyles.card}
              onClick={() => join(val.id, val.expertUrl)}
              style={{ cursor: "pointer" }}
            >
              <h1 className={cardStyles.title}>{val.title}</h1>
              <p className={cardStyles.text}>{val.desc}</p>
              <div className={cardStyles.sub}>
                <img
                  src={val.creator.profilePic}
                  className={cardStyles.profilePic}
                  alt="profile_pic"
                  aria-label="profile_pic"
                />
                <span style={{ marginLeft: "10px", fontSize: "0.8em" }}>
                  {val.creator.name} wants to connect with you
                </span>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
      </main>
    </>
  );
}
