import React, { useEffect } from "react";
import axios from "axios";

import styles from "../../../styles/Waitroom.module.css";
import Navbar from "../../../components/Navbar";
import Procrastinator from "../../../components/Procrastinator";

export default function user() {
  useEffect(async () => {
    //Send Create Call Request
    const payload = {
      user: JSON.parse(localStorage.getItem("user") || ""),
      title : "Someone Wants Advice",
      desc : "Are You Up to the Task?"
    };

    //Get Response
    const res = await axios.post("/api/calls/create-call", payload);

    //Redirect
    window.location.replace(res.data.url);
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1 className={styles.head}>Just a Sec...</h1>
        <p className={styles.connectSub}>
          We're finding the perfect expert for you. This process will take no
          more than a minute.
        </p>
        <br />
        <Procrastinator />
      </div>
    </>
  );
}
