import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Toggle from "react-toggle";
import { EditorState, convertToRaw } from "draft-js";
import "react-toggle/style.css";

import TextEditor from "../components/TextEditor";
import Navbar from "../components/Navbar";
import Meta from "../components/Meta";

export default function share() {
  //Data
  const [content, setContent] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [onlyExperts, setOnlyExperts] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [repliesAndHearts, setRepliesAndHearts] = useState(true);
  const [textFormatting, setTextFormatting] = useState(true);

  //UI States
  const [ui, setUI] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const titleInput = useRef();

  useEffect(() => {
    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/login");
    } else if (user) {
      //Check for Tutorial
      const isFirst =
        localStorage.getItem("share-tut") || "true" ? true : false;
      setIsFirst(isFirst);

      if (isFirst === true) {
        //Set ls to false
        // localStorage.setItem("share-tut", "false");
      }
      console.log(isFirst);
    }
  }, []);

  const nextCallbackContent = (draft) => {
    setContent(draft);
    setUI(1);
  };

  const nextCallbackTitle = () => {
    if (titleInput.current.value === "") {
      alert("Blank Titles are Not Allowed");
      return;
    }

    setTitle(titleInput.current.value);
    setUI(2);
  };

  const submit = async () => {
    const data = {
      title: title,
      content: convertToRaw(content.getCurrentContent()),
      user: JSON.parse(localStorage.getItem("user")) || {},
      options: {
        onlyExperts,
        anonymous,
        repliesAndHearts,
        textFormatting,
      },
    };

    //Backend query
    const res = await axios.post("/api/createPost", data);

    //Replace the url
    window.location.replace(`/post/v2?id=${res.data.docId}`);
    console.log(res);
  };

  return (
    <>
      <Meta
        title={"Share on Itsalright"}
        desc={"Share, Vent out whatever is on your mind on itsalright"}
      />
      <div>
        <Navbar />
        <div className="main">
          <h1 className="header">Share</h1>
          {ui === 0 && (
            <>
              <p className="stepBuf">
                <b>Step 1 : </b>
                Write to your heart's content, share whatever you've got on your
                mind, as detailed as you want. Our Experts will respond to you.
              </p>
              <br />
              <br />
              <TextEditor nextCallback={nextCallbackContent} />
            </>
          )}

          {ui === 1 && (
            <>
              <p className="stepBuf">
                <b>Step 2 : </b>
                Give A Title to your Post (can be as long or short as you want)
              </p>
              <br />
              <br />
              <input
                className="titleInput"
                placeholder="Your Title.."
                spellCheck={false}
                ref={titleInput}
              ></input>
              <button
                className="nextButton"
                onClick={() => nextCallbackTitle()}
              >
                Next
              </button>
            </>
          )}

          {ui === 2 && (
            <>
              <p className="stepBuf">
                <b>Step 3 : </b>
                Some Settings and Extra Stuff
              </p>
              <br />
              <br />
              <h1>OPTIONS</h1>
              <br />

              <div className="title">
                <span style={{ marginRight: "10px" }}>
                  Only Allow Experts to Reply
                </span>
                <Toggle
                  icons={false}
                  style={{ marginLeft: "30px" }}
                  onChange={(e) => setOnlyExperts(e.target.checked)}
                ></Toggle>
              </div>
              <br />

              <div className="title">
                <span style={{ marginRight: "10px" }}>Keep Me Anonymous</span>
                <Toggle
                  icons={false}
                  style={{ marginLeft: "30px" }}
                  onChange={(e) => setAnonymous(e.target.checked)}
                ></Toggle>
              </div>
              <br />

              <div className="title">
                <span style={{ marginRight: "10px" }}>
                  Enable Replies and hearts
                </span>
                <Toggle
                  icons={false}
                  style={{ marginLeft: "30px" }}
                  defaultChecked={true}
                  onChange={(e) => setRepliesAndHearts(e.target.checked)}
                ></Toggle>
              </div>
              <br />

              <div className="title">
                <span style={{ marginRight: "10px" }}>
                  Enable Text Formatting
                </span>
                <Toggle
                  icons={false}
                  style={{ marginLeft: "30px" }}
                  defaultChecked={true}
                  onChange={(e) => setTextFormatting(e.target.checked)}
                ></Toggle>
              </div>
              <br />

              <button className="nextButton" onClick={() => submit()}>
                Next
              </button>
            </>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .main {
            font-family: var(--mainfont);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          .header {
            font-weight: 200;
            font-size: 50px;
          }

          .title {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .titleInput {
            height: 50px;
            width: 60%;
            font-size: 20px;
            font-family: var(--mainfont) !important;
          }

          .nextButton {
            width: 100px;
            height: 45px;
            font-size: 16px;
            font-weight: 600;
            font-family: var(--mainfont);
            color: #fff;
            cursor: pointer;
            margin: 20px;
            text-align: center;
            border: none;
            background-size: 300% 100%;
            border-radius: 50px;
            background-image: linear-gradient(
              to right,
              #25aae1,
              #4481eb,
              #04befe,
              #3f86ed
            );
            box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
            -o-transition: all 0.4s ease-in-out;
            -webkit-transition: all 0.4s ease-in-out;
            transition: all 0.4s ease-in-out;
          }

          .nextButton:hover {
            background-position: 100% 0;
            -o-transition: all 0.4s ease-in-out;
            -webkit-transition: all 0.4s ease-in-out;
            transition: all 0.4s ease-in-out;
          }

          .nextButton:focus {
            outline: none;
          }

          .warning {
            color: red;
            font-size: 0.8em;
          }

          @media screen and (max-width: 907px) {
            .warning {
              padding-left: 10px;
            }
          }

          @media screen and (max-width: 778px) {
            .stepBuf {
              padding-left: 10px;
            }
          }
        `}
      </style>
    </>
  );
}
