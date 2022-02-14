import React from "react";
import Navbar from "../components/Navbar";

export default function Community() {
  return (
    <>
      <Navbar />
      <div className="content" style={{ textAlign: "center" }}>
        <h1>Community</h1>
        <br />
        <p style={{ width: "500px", marginLeft: "auto", marginRight: "auto" }}>
          As of Febuary 10 2022, we have over 1000 unique users, and over 1900
          messages and posts on the website. Our Community is something we take
          pride in.
          <br />
          We have an ecosystem of around 12 Moderators, checking each and every
          post, and filtering. They are the community's best.
          <br />
          As for our experts, we have over 400 : doctors, teachers, speakers,
          anyone you can imagine. You will get an expert in any field.
          <br />
          Our Community is one of the most <b>loving, caring and bonded</b>{" "}
          communities on the internet. Most of our members are samaritans which
          will help you no matter what the circumstances are.
          <br />
          Keep on Thriving guys :)
        </p>
      </div>
    </>
  );
}
