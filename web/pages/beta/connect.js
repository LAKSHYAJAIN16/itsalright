import React from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function connect() {
  return (
    <>
      <div className="bg" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "200px",
            marginTop: "30px",
            fontFamily: "var(--mainfont)",
            fontSize: "0.8em",
          }}
        >
          <p>
            <b>This Feature is currently under development </b>
          </p>
          <p>
            The Community highlighted some bugs with this feature, so we are
            working on fixing them and giving you a better experience
          </p>
          <p>
            Our Developer Team is working day and night on this. This will be
            back up and running as soon as possible.
          </p>
          <br />
          <p>- Lakshya</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
}
