import React from "react";

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function Community() {
  return (
    <>
      <Navbar />
      <Meta title={"Community"} desc={"A Page dedicated to our community"} />
      <div className="content" style={{ textAlign: "center" }}>
        <h1>Community</h1>
        <br />
        <p>
          As of Febuary 10 2022, we have over 1000 unique users, and over 1900
          messages and posts on the website. Our Community is something we take
          pride in.
        </p>
        <br />

        <p>
          We have an ecosystem of around 12 Moderators, checking each and every
          post, and filtering. They are the community's best.
        </p>
        <br />

        <p>
          As for our experts, we have over 400 : doctors, teachers, speakers,
          anyone you can imagine. You will get an expert in any field.
        </p>
        <br />

        <p>
          Our Community is one of the most <b>loving, caring and bonded</b>{" "}
          communities on the internet. Most of our members are samaritans which
          will help you no matter what the circumstances are.
        </p>
        <br />

        <p>Keep on Thriving guys :)</p>
        <br />
      </div>
    </>
  );
}
