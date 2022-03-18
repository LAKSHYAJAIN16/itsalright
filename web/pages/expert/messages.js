import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import sleep from "../../lib/sleep";
import ExpertChat from "../../components/ExpertChat";
import Navbar from "../../components/Navbar";
import Procrastinator from "../../components/Procrastinator";

export default function MessagesPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [talkee, setTalkee] = useState({});
  const [render, setRender] = useState(false);

  useEffect(async () => {
    //Backend
    const userID = JSON.parse(localStorage.getItem("user") || "").id;
    const res = await axios.post("/api/contact/expert-chats", {
      expert: userID,
    });

    //Set them
    const data = res.data.data;
    const arr = Object.keys(data).map((key) => data[key]);

    //Sort them using Cocktail Sort so that the latest are first
    let swapped = true;
    let start = 0;
    let end = arr.length;
    while (swapped == true) {
      // reset the swapped flag on entering the
      // loop, because it might be true from a
      // previous iteration.
      swapped = false;

      // loop from bottom to top same as
      // the bubble sort
      for (let i = start; i < end - 1; ++i) {
        if (arr[i].unSeenMessages > arr[i + 1].unSeenMessages) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }

      // if nothing moved, then array is sorted.
      if (swapped == false) break;

      // otherwise, reset the swapped flag so that it
      // can be used in the next stage
      swapped = false;

      // move the end point back by one, because
      // item at the end is in its rightful spot
      end = end - 1;

      // from top to bottom, doing the
      // same comparison as in the previous stage
      for (let i = end - 1; i >= start; i--) {
        if (arr[i].unSeenMessages > arr[i + 1].unSeenMessages) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }

      // increase the starting point, because
      // the last stage would have moved the next
      // smallest number to its rightful spot.
      start = start + 1;
    }

    setChats(arr.reverse());
    console.log(res);
  }, []);

  const switchChat = async (messages, talker) => {
    setRender(false);
    setTalkee(talker);
    setSelectedChat(messages);
    setRender(true);
  };

  const ChatUI = ({ val, idx, switchChatFN }) => {
    const [waiting, setWaiting] = useState(false);

    const update = async () => {
      await switchChatFN(val.messages, val.talkee);
      setRender(false);
      setWaiting(true);

      //THESE LINES OF CODE TOOK ME 3 MONTHS
      //According to Javascript [] = 0
      //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAH
      if (typeof window !== "undefined") {
        try {
          enableShaderQues();
          startAnimations();
          initiateBackendSocket();
          loadMSGS();

          if(renderQue === val.unSeenMessages){
            reloadMSGS();
            val.unSeenMessages = 0;
          }
        } catch (err) {
          val.unSeenMessages = 0;
        }
      }

      await sleep(10);
      setRender(true);
    };

    return (
      <>
        <div key={idx} className="singleChat" onClick={() => update()}>
          <img
            src={val.pic}
            alt="profile_pic"
            aria-label="profile_pic"
            className="pic"
          ></img>
          <div className="right-content">
            <p style={{ fontWeight: "500" }}>
              {val.name}{" "}
              {waiting === false ? (
                <>
                  {val.unSeenMessages > 0 && (
                    <>
                      <span className="unseen">{val.unSeenMessages}</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p>Works</p>
                </>
              )}
            </p>

            <p className="content">
              <span>
                {val.messages[val.messages.length - 1].message.content}
              </span>
            </p>
          </div>
        </div>

        <style jsx>
          {`
            .singleChat {
              display: flex;
              align-items: center;
              height: 70px;
              margin-top: 10px;
              cursor: pointer;
            }

            .pic {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .right-content {
              margin-left: 14px;
            }

            .content {
              color: grey;
            }

            .unseen {
              color: white;
              background-color: green;
              padding-left: 5px;
              padding-right: 7px;
              padding-bottom: 2px;
              margin-left: 20px;
              border-radius: 500px;
            }
          `}
        </style>
      </>
    );
  };

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <title>Your Messages</title>
      </Head>

      <div className="bg" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="main">
          <div className="chats">
            <p className="activeChats">Active Chats</p>
            <div style={{ overflow: "auto", height: "50vh" }}>
              {chats.map((val, idx) => (
                <>
                  <ChatUI val={val} idx={idx} switchChatFN={switchChat} />
                </>
              ))}
            </div>
          </div>

          <div className="chatArea">
            {render === true && (
              <ExpertChat messages={selectedChat} reciever={talkee} />
            )}
          </div>
        </div>

        <style jsx>
          {`
            .main {
              display: flex;
            }
            .chats {
              margin-left: 50px;
              width: 400px;
            }

            .activeChats {
              font-size: 1.6em;
              font-weight: 500;
            }

            .singleChat {
              display: flex;
              align-items: center;
              height: 70px;
              margin-top: 10px;
              cursor: pointer;
            }

            .pic {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .right-content {
              margin-left: 14px;
            }

            .content {
              color: grey;
            }

            .unseen {
              color: white;
              background-color: green;
              padding-left: 5px;
              padding-right: 7px;
              padding-bottom: 2px;
              margin-left: 20px;
              border-radius: 500px;
            }
          `}
        </style>
      </div>
    </>
  );
}
