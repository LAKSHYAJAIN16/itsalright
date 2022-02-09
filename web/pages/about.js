import React from "react";

import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="content">
        <h1 className="header">About us</h1>
        <p className="desc">
          We are a Charitable Website.
          <br />
          We are a Community Based Website.
          <br />
          We are an Open-Source Website.
          <br />
          We are a User Friendly Website.
          <br />
          <br />
          We care about our users.
          <br />
          We care about our experts.
          <br />
          We care about our website.
          <br />
          <br />
          Our goal is to help others.
          <br />
          Our goal is to make it "alright"
          <br />
          Our goal is to make the world a better place.
          <br />
          <br />
          <b style={{ fontSize: "1.3em" }}>
            We are Itsalright
          </b>
          <br />
          <br />
          ~ Lakshya Jain, Founder of Itsalright
        </p>
      </div>
      <style jsx>
        {`
          .header {
            font-family: var(--mainfont);
            font-weight: 200;
            text-align: center;
            margin-bottom: 10px;
          }

          .desc {
            font-family: var(--mainfont);
            text-align: center;
          }
          .logo {
            font-family: var(--logofont);
          }
        `}
      </style>
    </>
  );
}
