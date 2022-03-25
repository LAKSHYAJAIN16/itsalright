import axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";

import Procrastinator from "./Procrastinator";
import Keys from "../keys.json";

export default function Chat({ reciever }) {
  const [us, setUs] = useState({});
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [emoji, setEmoji] = useState(false);
  const [gif, setGif] = useState(false);
  const [renderGifs, setRenderGifs] = useState(true);
  const [actualGifs, setActualGifs] = useState([]);
  const [renderedSeens, setRenderedSeens] = useState(false);
  const audioRef = useRef();

  useEffect(async () => {
    const payload = {
      sender: JSON.parse(localStorage.getItem("user") || ""),
      reciever: reciever,
    };

    //Send Request
    const res = await axios.post("/api/getMessages", payload);
    const messagesRecieved = res.data.data;

    //Set User
    setUs(JSON.parse(localStorage.getItem("user") || ""));

    //Set Our Seens
    if (!renderedSeens) {
      await registerSeens(
        messagesRecieved,
        JSON.parse(localStorage.getItem("user") || "")
      );
    }

    //Set Messages
    if (messagesRecieved === [null]) {
      setMessages([]);
    } else {
      setMessages(messagesRecieved);
    }
  }, []);

  const registerSeens = async (messages, user) => {
    //Filter the messages
    const newMessages = messages.filter(
      (message) => message.seen === false && user.id === message.reciever.id
    );

    //If we have no Messages, don't waste internet and just return
    if (newMessages.length >= 0) {
      //Send to Backend
      const res = await axios.post("/api/contact/see", { msgs: newMessages });
      console.log(res);
    }
  };

  const messageText = async () => {
    //Check for some shortcuts
    let shortcut = false;
    if (text === ":)") {
      messageEmoji("😀");
      shortcut = true;
    }
    if (text === ":(") {
      messageEmoji("🥺");
      shortcut = true;
    }
    if (text === ";)") {
      messageEmoji("😏");
      shortcut = true;
    }
    if (text === ":((") {
      messageEmoji("😡");
      shortcut = true;
    }

    if (shortcut === false) {
      //Compile Data
      const data = {
        sender: JSON.parse(localStorage.getItem("user") || ""),
        reciever: reciever,
        message: {
          type: "text",
          content: text,
          timestamp: new Date(Date.now()).toISOString(),
        },
        seen: false,
      };

      //Send to backend
      const res = await axios.post("/api/message", data);
      console.log(res);

      //Play Sound Effect
      audioRef.current.play();

      //Add to messages UI
      const temp_messages = messages;
      temp_messages.push(data);
      setMessages(temp_messages);
    }

    //Reset Text
    setText("");
    sendNotifications(text);
  };

  const messageEmoji = async (text) => {
    //Compile Data
    const data = {
      sender: JSON.parse(localStorage.getItem("user") || ""),
      reciever: reciever,
      message: {
        type: "emoji",
        content: text,
        timestamp: new Date(Date.now()).toISOString(),
      },
      seen: false,
    };

    //Send to backend
    const res = await axios.post("/api/message", data);
    console.log(res);

    //Play Sound Effect
    audioRef.current.play();

    //Add to messages UI
    const temp_messages = messages;
    temp_messages.push(data);
    setMessages(temp_messages);

    //Reset Text
    setEmoji(false);
    sendNotifications(text);
  };

  const messageGif = async (gifURL) => {
    //Compile Data
    const data = {
      sender: JSON.parse(localStorage.getItem("user") || ""),
      reciever: reciever,
      message: {
        type: "gif",
        content: gifURL,
        timestamp: new Date(Date.now()).toISOString(),
      },
      seen: false,
    };

    //Send to backend
    const res = await axios.post("/api/message", data);
    console.log(res);

    //Play Sound Effect
    audioRef.current.play();

    //Add to messages UI
    const temp_messages = messages;
    temp_messages.push(data);
    setMessages(temp_messages);

    //Reset Text
    setGif(false);
    sendNotifications("Gif : " + gifURL);
  };

  const sendNotifications = async(msg) => {
    //Get Email Address and name
    const email = reciever.email;
    const name = JSON.parse(localStorage.getItem("user") || "").name;

    //Send API request
    const res = await axios.get(`/api/email/notifications/message?m=${email}&n=${name}&msg=${msg}`);
  }

  const searchGifs = async (text) => {
    setRenderGifs(false);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${Keys.GiphyAPIKEY}&q=${text}&limit=9`;
    const res = await axios.get(url);
    console.log(res);
    setActualGifs(res.data.data);
    setRenderGifs(true);
  };

  const TextMessage = (message) => (
    <>
      <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
        {" "}
        {us.id == message.message.sender.id ? (
          <>
            <div className="message byUs">
              <p className="messageBody"> {message.message.message.content}</p>
            </div>
            <div className="underneathMessage" style={{ float: "right" }}>
              <br />
              <p className="underneathContent" style={{ marginTop: "-7px" }}>
                {message.message.seen ? (
                  <>
                    <i className="bx bx-check-double check"></i>
                  </>
                ) : (
                  <>
                    <i className="bx bx-check-double notCheck"></i>
                  </>
                )}
                <span style={{ marginRight: "10px" }}>
                  {"   " + moment(message.message.message.timestamp).fromNow()}
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="message byOther">
              <p className="messageBody"> {message.message.message.content}</p>
            </div>
            <div className="underneathMessage">
              <br />
              <p className="underneathContent" style={{ marginTop: "-10px" }}>
                <span style={{ marginLeft: "5px" }}>
                  {" "}
                  {moment(message.message.message.timestamp).fromNow()}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>
        {`
          .message {
            display: flex;
            align-items: center;
            color: white;
            border-radius: 25px;
            margin-bottom: 10px;
            min-height: 40px;
            min-width: 5%;
            max-width: 80%;
            zoom: 0.8;
          }

          .messageBody {
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 10px;
            padding-left: 10px;
            white-space: initial;
            word-wrap: break-word;
          }

          .byUs {
            background-color: #00827f;
            float: right;
          }

          .byOther {
            background-color: grey;
            float: left;
          }

          .underneathMessage {
            margin-top: 0px;
          }

          .underneathContent {
            font-size: 0.7em;
          }

          .notCheck {
            zoom: 1.5;
          }

          .check {
            color: blue;
            zoom: 1.5;
          }
        `}
      </style>
    </>
  );

  const EmojiMessage = (message) => (
    <>
      <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
        {" "}
        {us.id == message.message.sender.id ? (
          <>
            <div className="message byUs">
              <p className="messageBody" style={{ fontSize: "3em" }}>
                {" "}
                {message.message.message.content}
              </p>
            </div>
            <div className="underneathMessage" style={{ float: "right" }}>
              <br />
              <br />
              <p className="underneathContent">
                {message.message.seen ? (
                  <>
                    <i className="bx bx-check-double check"></i>
                  </>
                ) : (
                  <>
                    <i className="bx bx-check-double notCheck"></i>
                  </>
                )}
                <span style={{ marginRight: "10px" }}>
                  {" "}
                  {" " + moment(message.message.message.timestamp).fromNow()}
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="message byOther">
              <p className="messageBody" style={{ fontSize: "3em" }}>
                {" "}
                {message.message.message.content}
              </p>
            </div>
            <div className="underneathMessage">
              <br />
              <br />
              <p className="underneathContent">
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  {moment(message.message.message.timestamp).fromNow()}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>
        {`
          .message {
            display: flex;
            align-items: center;
            color: white;
            border-radius: 25px;
            margin-bottom: 10px;
            min-height: 40px;
            min-width: 5%;
            max-width: 80%;
            zoom: 0.8;
          }

          .messageBody {
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 10px;
            padding-left: 10px;
            white-space: initial;
            word-wrap: break-word;
          }

          .byUs {
            background-color: #00827f;
            float: right;
          }

          .byOther {
            background-color: grey;
            float: left;
          }

          .underneathMessage {
            margin-top: 0px;
          }

          .underneathContent {
            font-size: 0.7em;
          }

          .notCheck {
            zoom: 1.5;
          }

          .check {
            color: blue;
            zoom: 1.5;
          }
        `}
      </style>
    </>
  );

  const GifMessage = (message) => (
    <>
      <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
        {" "}
        {us.id == message.message.sender.id ? (
          <>
            <div className="message byUs">
              <p
                className="messageBody"
                style={{ fontSize: "3em", position: "relative" }}
              >
                <iframe src={message.message.message.content} frameBorder="0" />
              </p>
            </div>
            <div className="underneathMessage" style={{ float: "right" }}>
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className="underneathContent" style={{ paddingLeft: "10px" }}>
                {message.message.seen ? (
                  <>
                    <i className="bx bx-check-double check"></i>
                  </>
                ) : (
                  <>
                    <i className="bx bx-check-double notCheck"></i>
                  </>
                )}
                <span style={{ marginRight: "10px" }}>
                  {"   " + moment(message.message.message.timestamp).fromNow()}
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="message byOther">
              <p className="messageBody" style={{ fontSize: "3em" }}>
                <iframe src={message.message.message.content} frameBorder="0" />
              </p>
            </div>
            <div className="underneathMessage">
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className="underneathContent" style={{ paddingLeft: "10px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  {"   " + moment(message.message.message.timestamp).fromNow()}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>
        {`
          .message {
            display: flex;
            align-items: center;
            color: white;
            border-radius: 25px;
            margin-bottom: 10px;
            min-height: 40px;
            min-width: 5%;
            max-width: 80%;
            zoom: 0.8;
          }

          .messageBody {
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 10px;
            padding-left: 10px;
            white-space: initial;
            word-wrap: break-word;
          }

          .byUs {
            background-color: #00827f;
            float: right;
          }

          .byOther {
            background-color: grey;
            float: left;
          }

          .underneathMessage {
            margin-top: 0px;
          }

          .underneathContent {
            font-size: 0.7em;
          }

          .notCheck {
            zoom: 1.5;
          }

          .check {
            color: blue;
            zoom: 1.5;
          }
        `}
      </style>
    </>
  );

  return (
    <>
      <div className="content">
        <div className="messages">
          <br />
          {messages.length === 0 ? (
            <>
              <p style={{ textAlign: "center" }}>
                There are no messages between you and {reciever.name} !
              </p>
              <p style={{ textAlign: "center" }}>
                Change that by typing a message!
              </p>
            </>
          ) : (
            <>
              {messages.map((data, idx) => (
                <div key={idx}>
                  {data && (
                    <>
                      {data.message.type === "text" && (
                        <TextMessage message={data} />
                      )}
                      {data.message.type === "emoji" && (
                        <EmojiMessage message={data} />
                      )}
                      {data.message.type === "gif" && (
                        <GifMessage message={data} />
                      )}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {emoji && (
          <>
            <div className="emojiPanel">
              <p className="panelHeader">Emoji Panel</p>
              <br />
              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🙂
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😀
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😃
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😄
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😁
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😆
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤣
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😂
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🙃
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😉
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😇
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😎
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤓
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🧐
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🥳
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🥰
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😍
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤩
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😘
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😗
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😚
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😋
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😛
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😜
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤪
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😝
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤑
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤗
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤭
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤫
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤔
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😐
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤐
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤨
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😑
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😶
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😏
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😒
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🙄
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😬
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤥
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😪
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😴
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😌
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😔
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🤤
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😕
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😟
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🙁
                </div>
              </div>

              <div className="emojiPanelRow">
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😮
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😯
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😲
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😳
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  🥺
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😦
                </div>
                <div
                  className="emojiPanelItem"
                  onClick={(e) => messageEmoji(e.target.innerText)}
                >
                  😨
                </div>
              </div>
            </div>
          </>
        )}

        {gif && (
          <>
            <div className="emojiPanel">
              <p className="panelHeader">Gifs</p>
              <input
                onChange={(e) => searchGifs(e.target.value)}
                className="gifInput"
                placeholder="Search for Gifs...."
              ></input>
              <div className="actualContent">
                {renderGifs && actualGifs.length !== 0 ? (
                  <div className="gifs" style={{ marginTop: "10px" }}>
                    <div key={1} className="gifContainer">
                      <iframe
                        src={actualGifs[0].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[0].embed_url)}
                      ></div>
                    </div>

                    <div key={2} className="gifContainer">
                      <iframe
                        src={actualGifs[1].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[1].embed_url)}
                      ></div>
                    </div>

                    <div key={3} className="gifContainer">
                      <iframe
                        src={actualGifs[2].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[2].embed_url)}
                      ></div>
                    </div>

                    <div key={4} className="gifContainer">
                      <iframe
                        src={actualGifs[3].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[3].embed_url)}
                      ></div>
                    </div>

                    <div key={5} className="gifContainer">
                      <iframe
                        src={actualGifs[4].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[4].embed_url)}
                      ></div>
                    </div>

                    <div key={6} className="gifContainer">
                      <iframe
                        src={actualGifs[5].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[5].embed_url)}
                      ></div>
                    </div>

                    <div key={7} className="gifContainer">
                      <iframe
                        src={actualGifs[6].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[6].embed_url)}
                      ></div>
                    </div>

                    <div key={8} className="gifContainer">
                      <iframe
                        src={actualGifs[7].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[7].embed_url)}
                      ></div>
                    </div>

                    <div key={9} className="gifContainer">
                      <iframe
                        src={actualGifs[8].embed_url}
                        style={{ zIndex: 1 }}
                        frameBorder="0"
                        className="gif"
                      />

                      {/* Make it not redirect */}
                      <div
                        className="blocker"
                        onClick={() => messageGif(actualGifs[8].embed_url)}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <Procrastinator />
                )}
              </div>
            </div>
          </>
        )}

        <div className="controls">
          <audio src="/sendmsg.mp3" ref={audioRef}></audio>
          <i
            className="bx bx-smile icon"
            style={{ marginLeft: "3px" }}
            onClick={() => setEmoji(!emoji)}
          ></i>
          <i className="bx bxs-file-gif icon" onClick={() => setGif(!gif)}></i>
          <input
            placeholder="Type a Message..."
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && messageText()}
          />
          <i
            className="bx bx-send icon"
            style={{ marginLeft: "3px", zoom: 1.5 }}
            onClick={() => messageText()}
          ></i>
        </div>
      </div>

      <style jsx>
        {`
          .content {
            font-size: 1em;
            font-family: var(--mainfont);
            background-color: var(--color4);
            margin-left: 100px;
            width: 600px;
            height: 500px;
          }

          .topbar {
            height: 30px;
            width: 100%;
            background-color: var(--color3);
          }

          .messages {
            overflow: auto !important;
            height: 90% !important;
            position: relative !important;
            display: flex;
            flex-direction: column;
          }

          .input {
            border: none;
            outline: none;
            border-radius: 25px;
            padding-left: 10px;
            background-color: white;
            margin-left: 3px;
            height: 40px;
            width: 74%;
            font-size: 1em;
            font-family: var(--mainfont);
          }

          .controls {
            background-color: #e8e7e6;
            width: 100%;
            height: 50px;
            padding-top: 0px;
            display: flex;
            align-items: center;
          }

          .icon {
            cursor: pointer;
            zoom: 2;
            padding-right: 3px;
          }

          .emojiPanel {
            margin-top: -300px;
            width: 300px;
            height: 300px;
            background-color: lightgrey;
            position: relative;
          }

          .panelHeader {
            text-align: center;
            font-family: var(--mainfont);
            font-size: 1.2em;
            font-weight: 250;
            padding-top: 4px;
          }

          .emojiPanelRow {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .emojiPanelItem {
            cursor: pointer;
            font-size: 1.3em;
            margin-right: 10px;
          }

          .gifInput {
            margin-left: 60px;
            font-family: var(--mainfont);
          }

          .gifs {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
          }

          .gifContainer {
            position: relative;
            marginright: 20px;
          }

          .gif {
            height: 100px;
            width: 100px;
            zoom: 0.8;
          }

          .blocker {
            z-index: 10;
            position: absolute;
            width: 100px;
            height: 100px;
            margin-top: -100px;
            cursor: pointer;
          }

          ::-webkit-scrollbar {
            width: 4px;
            height: 5px;
            cursor: pointer;
          }
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          ::-webkit-scrollbar-thumb {
            background: #666;
            transition: all 1s ease;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #777;
          }
        `}
      </style>
    </>
  );
}
