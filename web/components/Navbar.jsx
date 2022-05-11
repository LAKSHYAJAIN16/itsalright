import React, { useEffect, useState } from "react";
import Head from "next/head";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Keys from "../keys.json";

export default function Navbar() {
  const [logged, setLogged] = useState(undefined);
  const [isExpert, setIsExpert] = useState(false);
  const [mobileUI, setMobileUI] = useState(false);
  const [profilePIC, setProfilePIC] = useState(undefined);

  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      setLogged(JSON.parse(localStorage.getItem("logged")) || false);
      setProfilePIC(JSON.parse(localStorage.getItem("user"))?.profilePic);
      setIsExpert(JSON.parse(localStorage.getItem("user"))?.isExpert);
    }

    //Check on update if we're on mobile
    const isMobile = window.innerWidth <= Keys["mobile-cutoff"];
    setMobileUI(isMobile);

    //Add Event Listener to resize
    window.addEventListener("resize", () => {
      //Check on update if we're on mobile
      const isMobile = window.innerWidth <= Keys["mobile-cutoff"];
      setMobileUI(isMobile);
    });
  }, []);

  const ToolTipComponent = (text, event) => (
    <Tooltip id={text} {...event}>
      {text}
    </Tooltip>
  );

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          position: "fixed",
          zIndex: "696969696969",
          width: "100%",
          height: "70px",
          backgroundColor: "rgba(255,255,255,0.5)",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 10px 1px 3px 1px",
        }}
        on
      >
        {logged !== undefined && (
          <>
            {" "}
            <div className="main">
              <a href="/home">
                <p className="logoText">
                  itsalright{" "}
                  {isExpert && <span className="expert">Expert</span>}
                </p>
              </a>
              {mobileUI ? (
                <>
                  <div className="m-icons">
                    {/* Icon 1 : Browse*/}
                    <a href="/browse">
                      <div className="m-icon-wrapper">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={(e) => ToolTipComponent("Browse", e)}
                        >
                          <div className="">
                            <i className="bx bx-home m-icon"></i>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </a>

                    {/* Icon 2 : Share/Write */}
                    <a href="/share">
                      <div className="m-icon-wrapper">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={(e) => ToolTipComponent("Write", e)}
                        >
                          <div className="">
                            <i className="bx bx-pencil m-icon"></i>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </a>

                    {/* Icon 3 : Connect */}
                    <a
                      href={
                        isExpert
                          ? "/connect-rts/sta/expert"
                          : "/connect-rts/sta/user"
                      }
                    >
                      <div className="m-icon-wrapper">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={(e) => ToolTipComponent("Connect", e)}
                        >
                          <div className="">
                            <i className="bx bx-globe-alt m-icon"></i>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </a>

                    {/* Icon 4 : Contact */}
                    <a href={isExpert ? "/messages" : "/contact"}>
                      <div className="m-icon-wrapper">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={(e) =>
                            ToolTipComponent(
                              isExpert ? "Messages" : "Contact",
                              e
                            )
                          }
                        >
                          <div className="">
                            <i className="bx bx-chat m-icon"></i>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </a>
                  </div>

                  <div className="profilePic">
                    {logged ? (
                      <>
                        <a href="/user-settings">
                          <img src={profilePIC} className="profilePic"></img>
                        </a>
                      </>
                    ) : (
                      <a href="/login">
                        <button
                          className="standardButton log"
                          style={{ marginLeft: "20px" }}
                        >
                          Login
                        </button>
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {isExpert ? (
                    <>
                      <a href="/browse">
                        <p className="navOption" style={{ zoom: 0.93 }}>
                          Answer
                        </p>
                      </a>
                      <a href="/connect-rts/sta/expert">
                        <p className="navOption" style={{ zoom: 0.93 }}>
                          Connect
                        </p>
                      </a>
                      <a href="/expert/messages">
                        <p className="navOption" style={{ zoom: 0.93 }}>
                          Messages
                        </p>
                      </a>
                    </>
                  ) : (
                    <>
                      <a href="/browse">
                        <p className="navOption">Browse</p>
                      </a>
                      <a href="/share">
                        <p className="navOption">Share</p>
                      </a>
                      <a href="/connect-rts/sta/user">
                        <p className="navOption">Connect</p>
                      </a>
                      <a href="/contact">
                        <p className="navOption">Contact</p>
                      </a>
                    </>
                  )}

                  {logged ? (
                    <>
                      <a href="/user-settings">
                        <img src={profilePIC} className="profilePic"></img>
                      </a>
                    </>
                  ) : (
                    <a href="/login">
                      <button
                        className="standardButton log"
                        style={{ marginLeft: "20px" }}
                      >
                        Login
                      </button>
                    </a>
                  )}
                </>
              )}
            </div>
            <style jsx>
              {`
                .main {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-top: 0px;
                }

                .logoText {
                  font-weight: 500;
                  font-family: var(--logofont);
                  font-size: 2.4em;
                  margin-left: 8vw;
                  margin-right: 10vw;
                  color: black;
                }

                .navOption {
                  color: darkgray;
                  font-size: 1.2em;
                  font-weight: 300;
                  font-family: var(--mainfont);
                  margin-right: 7vw;
                  cursor: pointer;
                  transition: all 500ms ease;
                }

                .navOption:hover {
                  color: black;
                }

                .log {
                  /* EMPTY CSS THANKS TIM */
                }

                .profilePic {
                  height: 65px;
                  width: 65px;
                  border-radius: 50%;
                  margin-left: 10vw;
                  cursor: pointer;
                }

                .expert {
                  font-family: var(--royalfont);
                  font-size: 0.6em;
                  font-weight: 400;
                  color: var(--royalcolor);
                }

                .m-icons {
                  display: flex;
                }

                .m-icon-wrapper {
                  margin-left: 3.3vw;
                  cursor: pointer;
                }

                .m-icon {
                  zoom: 2.3;
                }

                /* Media Queries because I hate myself */
                @media screen and (max-width: 1080px) {
                  .profilePic {
                    margin-left: 5vw;
                  }

                  .expert {
                    display : none;
                  }
                }

                @media screen and (max-width: 961px) {
                  .profilePic {
                    margin-left: 3vw;
                  }
                }

                @media screen and (max-width: 890px) {
                  .profilePic {
                    margin-left: 0.7vw;
                  }

                  .navOption {
                    margin-right: 3vw;
                  }
                }

                @media screen and (max-width: ${Keys["mobile-cutoff"]}px) {
                  .logoText {
                    margin-left: 3vw;
                    margin-right: 5vw;
                  }

                  .profilePic {
                    margin-left: 5vw;
                  }

                  .log {
                    margin-top : 10px;
                  }
                }

                @media screen and (max-width: 540px) {
                  .m-icon-wrapper {
                    margin-left: 2vw;
                  }
                }

                @media screen and (max-width: 475px) {
                  .profilePic {
                    margin-left: 3vw;
                  }
                }

                @media screen and (max-width: 455px) {
                  .m-icon {
                    zoom: 2;
                  }

                  .m-icon-wrapper {
                    margin-top: 8px;
                  }

                  .profilePic {
                    height: 50px;
                    width: 50px;
                  }

                  .logoText {
                    font-size: 2em;
                  }

                  .main {
                    margin-top: 10px;
                  }
                }

                @media screen and (max-width: 384px) {
                  .m-icon {
                    zoom: 1.7;
                  }

                  .log {
                    display : none;
                  }
                }

                @media screen and (max-width: 354px) {
                  .logoText {
                    margin-left: 1vw;
                  }
                }

                @media screen and (max-width: 344px) {
                  .m-icon {
                    zoom: 1.4;
                  }
                }

                /* Ha ha default styles of course NOTHING can go wrong*/
                a {
                  color : black;
                }
              `}
            </style>
          </>
        )}
      </div>
      
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
