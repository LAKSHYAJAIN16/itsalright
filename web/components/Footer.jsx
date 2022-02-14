import React from "react";

export default function Footer() {
  return (
    <div style={{ marginTop: "100px" }}>
      <hr />
      <footer className="main">
        <div className="column">
          <p className="logoText">itsalright</p>
          <p>A website by Lakshya Jain</p>
        </div>
        <div className="column">
            <a className="link" href="/about">About</a>
            <a className="link" href="/contact">Contact</a>
            <a className="link" href="/connect">Connect</a>
            <a className="link" href="/browse">Browse</a>
            <a className="link" href="/contact">Contact</a>
        </div>
        <div className="column">
            <a className="link" href="/masthead">Masthead</a>
            <a className="link" href="/credits">Credits</a>
            <a className="link" href="/community">Community</a>
            <a className="link" href="/helpdesk">Help Desk</a>
            <a className="link" href="/report">Report</a>
        </div>
        <div className="column">
            <p>
                This website is Completely Open Source
                <br />
                and Licensed under the MIT License.
                <br />
                Check it out <a href="https://github.com/LAKSHYAJAIN16/itsalright">here</a>
            </p>
        </div>
      </footer>
      <style jsx>
        {`
          .main {
            display: flex;
            align-items: center;
            justify-content: center;
            zoom : 0.7;
            font-family : var(--mainfont);
            padding-bottom : 10px;
          }

          .logoText {
            font-weight: 500;
            font-family: var(--logofont);
            font-size: 2.4em;
          }

          .column {
              display : flex;
              flex-direction : column;
              justify-content : center;
              align-items : center;
              margin-right : 200px;
          }

          .link {
              cursor : pointer;
          }
        `}
      </style>
    </div>
  );
}
