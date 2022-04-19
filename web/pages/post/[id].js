import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import moment from "moment";
import { convertFromRaw } from "draft-js";

import CommentSection from "../../components/CommentSection";
import TextViewer from "../../components/TextViewer";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SinglePost(context) {
  const [hearts, setHearts] = useState([]);
  const [heartState, setHeartState] = useState(false);
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    setHearts(context.props.hearts);

    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setHeartState(false);
      setSigned(false);
    } else if (user) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
      setSigned(true);

      //Check if we've already hearted the post
      const alreadyHearted = false;
      const userID = JSON.parse(localStorage.getItem("user")).id;
      for (let i = 0; i < context.props.hearts.length; i++) {
        const heart = context.props.hearts[i];
        if (heart.userID === userID) {
          alreadyHearted = true;
          break;
        }
      }

      setHeartState(alreadyHearted);
    }
  }, []);

  const heart = async () => {
    if(signed === false){
      alert("Sign In To Heart Post");
      return;
    }

    //Check heartState
    const targetHeartState = !heartState;

    if (targetHeartState === true) {
      //We're Hearting the Comment, so create a temp
      const temp_hearts = hearts;

      //Create Data Object
      const data_object = {
        userID: JSON.parse(localStorage.getItem("user")).id,
        timestamp: new Date(Date.now()).toISOString(),
      };

      temp_hearts.push(data_object);
      setHearts(temp_hearts);

      //Push it to backend
      const request = {
        hearts: temp_hearts,
        id: context.props.id,
      };
      setHeartState(targetHeartState);
      await axios.post("/api/heartPost", request);
    } else if (targetHeartState === false) {
      //Remove the Object which has our userId
      const temp_hearts = hearts;
      const userID = JSON.parse(localStorage.getItem("user")).id;
      temp_hearts.map((heart, index) => {
        if (heart.userID === userID) {
          temp_hearts.splice(index, 1);
        }
      });
      setHearts(temp_hearts);

      //Push it to backend
      const request = {
        hearts: temp_hearts,
        id: context.props.id,
      };
      setHeartState(targetHeartState);
      await axios.post("/api/heartPost", request);
    }
  };

  const deleteFN = async () => {
    await axios.post("/api/delPost", { id: context.props.id });
    window.location.replace("/");
  };

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        <title>
          {context.props.title} by {context.props.user.name} : Itsalright
        </title>
      </Head>

      {context !== undefined && (
        <div className="bg" style={{ minHeight: "100vh" }}>
          <Navbar />

          <span className="title">
            {context.props.title}
            {context.props.answered ? (
              <i className="bx bx-check check-icon"></i>
            ) : (
              <></>
            )}
          </span>

          <div className="icons">
            {user.id === context.props.user.id && (
              <>
                <i
                  className="bx bx-trash delete-icon"
                  onClick={() => deleteFN()}
                ></i>
              </>
            )}
          </div>
          <br />

          <div className="icons">
            {context.props.options.repliesAndHearts ? (
              <>
                <i
                  className={
                    heartState === false
                      ? `bx bx-heart heart-icon`
                      : `bx bxs-heart heart-icon`
                  }
                  onClick={() => heart()}
                />
                <span className="hearts">
                  {hearts.length} heart{hearts.length === 1 ? "" : "s"}
                </span>
              </>
            ) : (
              <>
                <p style={{ zoom: 0.6 }}>
                  This User has Disabled Hearts on this Post
                </p>
              </>
            )}
          </div>

          <div className="text">
            <TextViewer rawEditor={convertFromRaw(context.props.content)} />
          </div>

          <div className="prefix">
            {context.props.options.anonymous === false ? (
              <>
                <img
                  src={context.props.user.profilePic}
                  className="profilePic"
                  alt="profile_pic"
                  aria-label="profile_pic"
                ></img>
                <span className="userInfo">
                  {context.props.user.name}{" "}
                  {moment(context.props.timestamp).fromNow()}
                </span>
              </>
            ) : (
              <>
                <span className="userInfo">
                  This was posted anonymously{" "}
                  {moment(context.props.timestamp).fromNow()}
                </span>
              </>
            )}
          </div>
          <hr />

          {context.props.options.repliesAndHearts ? (
            <>
              {" "}
              <CommentSection
                comments={context.props.comments}
                user={context.props.user}
                postID={context.props.id}
              />
            </>
          ) : (
            <p style={{ textAlign: "center", fontFamily: "var(--mainfont)" }}>
              This User has Disabled Comments on this Post.{" "}
            </p>
          )}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />

          <style jsx>
            {`
              .text {
                padding-left: 60px;
              }

              .prefix {
                display: flex;
                align-items: center;
                margin-left: 50px;
                margin-top: 50px;
                zoom: 0.9;
              }

              .profilePic {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                cursor: pointer;
              }

              .userInfo {
                margin-left: 10px;
                font-family: var(--mainfont);
              }

              .title {
                font-family: var(--mainfont);
                font-size: 50px;
                text-align: center;
                margin-left: auto;
                margin-right: auto;
                display: flex;
                justify-content: center;
              }

              .icons {
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: var(--mainfont);
              }

              .heart-icon {
                color: red;
                zoom: 1.4;
                cursor: pointer;
              }

              .check-icon {
                color: green;
                zoom: 1.4;
                margin-top: -5px;
              }

              .delete-icon {
                color: red;
                zoom: 1.4;
                cursor: pointer;
                margin-top: -5px;
              }

              .views {
                margin-left: 20px;
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  //Get the Query id
  const id = context.query.id;

  try {
    //Call Backend
    const res = await axios.get("http://www.itsalright.in/api/specifics/" + id);
    const data = res.data.data;
    if (data === undefined) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        props: data,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
