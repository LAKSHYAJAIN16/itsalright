import React, { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import axios from "axios";

import styles from "../../../styles/Waitroom.module.css";
import Navbar from "../../../components/Navbar";
import Procrastinator from "../../../components/Procrastinator";
import sleep from "../../../lib/sleep";
import { db } from "../../../lib/firebase";

export default function expert() {
  useEffect(async () => {
    //Add us to the available experts
    const payload = {
      user: JSON.parse(localStorage.getItem("user") || ""),
    };
    await axios.post("/api/calls/create-av-expert", payload);

    //Subscribe to the event when a new call is added
    const newCall = onSnapshot(collection(db, "available-calls"), (col) => {
      col.docChanges().forEach((doc) => {
        if (doc.type === "added") {
          const data = doc.doc.data();
          if (data.assigned === true) {
            if (
              data.expert.id ===
              JSON.parse(localStorage.getItem("user") || "").id
            ) {
              const fn = async () => {
                //Redirect to that URL after some time
                await sleep(700);
                window.location.replace(data.expertUrl);
              };
              fn();
            }
          }
        }
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <h1 className={styles.head}>Expert Waitroom</h1>
        <p className={styles.connectSub}>
          Thank you for clicking connect! We will have a user for you to help in
          no time. The average waiting time for the current time{" "}
          {new Date(Date.now()).toTimeString()} is about <b>40-60 seconds</b>.
        </p>
        <br />
        <p className={styles.connectSub}>
          <b>
            When we connect you to a user, you will automatically be redirected.
          </b>
        </p>
        <br />
        <br />
        <br />
        <Procrastinator />
      </main>
    </>
  );
}
