import React from "react";

import Navbar from "../../components/Navbar";

export default function PostExpert() {
  return (
    <div>
      <Navbar />
      <div className="main">
        <img
          src="/thanks.gif"
          alt="thanks"
          aria-label="thanks"
          style={{ zoom: 0.6 }}
        />
        <br />
        <p className="desc">
          <b>
            We have created an account and given you Expert Status, but you will
            get the full benifits of the Expert Rank once we maunally confirm
            your submition. It will take us at maximum 48 hours to do this. We
            will email you as soon as it is done.
          </b>
        </p>

        <br />
        <p className="desc">
          Until then, welcome to the Expert Club! You have joined an elite club
          of <b>1900</b> experts who live to help other people. You will have to
          adhere to the
          <a href="/guidelines/expert"> expert guidlines</a> when you are on our
          website. You now can be contacted via the{" "}
          <a href="/contact">contact</a> panel and can{" "}
          <a href="/connect">connect</a> to users directly.
          <br />
          So start having fun and helping people!
        </p>

        <br />
        <a href="/browse">
          <button className="standardButton">Continue</button>
        </a>
      </div>
      <style jsx>
        {`
          .main {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          .desc {
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
