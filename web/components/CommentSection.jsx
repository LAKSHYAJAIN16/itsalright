import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import genID from "../lib/genID";

import Procrastinator from "./Procrastinator";

export default function CommentSection({ comments, user, postID }) {
  const [renderComments, setRenderComments] = useState(false);
  const [realComments, setRealComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [signedIN, setSignedIN] = useState(false);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    //Initial
    setRenderComments(false);
    setRealComments(comments);

    //Sort the comments
    let aux = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.isAnswer) {
        aux.push(comment);
      }
    }

    //Add two arrays
    const fin = aux.concat(comments);

    //Filter to remove duplicates
    let finArray = fin.filter(function (item, pos) {
      return fin.indexOf(item) == pos;
    });

    console.log(finArray);

    setFilteredComments(finArray);

    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setSignedIN(false);
      setRenderComments(true);
    } else if (user) {
      setSignedIN(true);
      setUserID(JSON.parse(localStorage.getItem("user")).id);
      setRenderComments(true);
    }
  }, []);

  const submit = async () => {
    setRenderComments(false);
    //Retrieve Text
    const text = document.getElementById("commentText").value;

    //Create Data Object
    const realUser = JSON.parse(localStorage.getItem("user"));
    const isExpert = JSON.parse(localStorage.getItem("user") || "").isExpert;
    console.log(isExpert);
    const data = {
      text: text,
      username: realUser.name,
      userID: realUser.id,
      userProfilePIC: realUser.profilePic,
      timestamp: new Date(Date.now()).toISOString(),
      isExpertComment: isExpert,
      isAnswer: false,
      id: genID(14),
    };

    //Add it to comments array
    const temp_comments = realComments;
    temp_comments.push(data);
    setRealComments(temp_comments);

    //Push to Backend
    const res = await axios.post("/api/comment", {
      comments: temp_comments,
      id: postID,
    });
    console.log(res);

    //Make it so that it comes on top
    sortComments("newest");

    //Notifications
    const res2 = await axios.get(
      `/api/email/notifications/comment?m=${user.email}&n=${realUser.name}&msg=${text}`
    );
  };

  const sortComments = (intent) => {
    setRenderComments(false);
    const temp_comments = realComments;

    if (intent === "answers") {
      const aux = [];
      for (let i = 0; i < temp_comments.length; i++) {
        const comment = temp_comments[i];
        if (comment.isAnswer) {
          aux.push(comment);
        }
      }
      console.log(aux);
      setFilteredComments(aux);
    }

    if (intent === "experts") {
      const aux = [];
      for (let i = 0; i < temp_comments.length; i++) {
        const comment = temp_comments[i];
        if (comment.isExpertComment) {
          aux.push(comment);
        }
      }
      console.log(aux);
      setFilteredComments(aux);
    }

    if (intent === "top") {
      //Sort the comments
      let aux = [];
      for (let i = 0; i < temp_comments.length; i++) {
        const comment = temp_comments[i];
        if (comment.isAnswer) {
          aux.push(comment);
        }
      }

      //Add two arrays
      const fin = aux.concat(temp_comments);

      //Filter to remove duplicates
      let finArray = fin.filter(function (item, pos) {
        return fin.indexOf(item) == pos;
      });
      setFilteredComments(finArray);
    }

    if (intent === "newest") {
      //TODO : Fix the bug
      const aux = temp_comments;
      setFilteredComments(aux);
    }
    setRenderComments(true);
  };

  //Comment Input Component
  const CommentInput = () => {
    return (
      <>
        <div className="commentInputMain">
          <img
            src={JSON.parse(localStorage.getItem("user")).profilePic}
            alt="profile_pic"
            aria-label="profile_pic"
            className="profilePic"
          ></img>
          <input
            placeholder="Add a Comment..."
            className="commentInputField"
            id="commentText"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit();
              }
            }}
          />
          <div className="buttons">
            <button className="cancelButton">Cancel</button>
            <button className="submitButton" onClick={() => submit()}>
              Comment
            </button>
          </div>
        </div>

        <style jsx>
          {`
            .commentInputMain {
              margin-left: 50px;
              margin-top: -10px;
              display: flex;
              align-items: center;
            }

            .profilePic {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .commentInputField {
              margin-top: -20px;
              margin-left: 20px;
              width: 700px;
              color: black;
              font-family: var(--mainfont);
              background-color: transparent;
              background-image: linear-gradient(gray, gray);
              background-size: 10% 3px;
              background-repeat: no-repeat;
              background-position: center 110%;
              border: none;
              outline: none;
              transition: all 0.3s ease;
              z-index: 69;
            }

            .commentInputField:focus {
              background-image: linear-gradient(black, white);
              background-size: 100% 3px;
            }

            .buttons {
              display: flex;
              align-items: center;
              margin-top: 50px;
              margin-left: -160px;
            }

            .cancelButton {
              border: none;
              background-color: transparent;
              font-size: 0.8em;
              font-family: var(--mainfont);
            }

            .submitButton {
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
              zoom: 0.85;
            }

            .submitButton:hover {
              background-position: 100% 0;
              -o-transition: all 0.4s ease-in-out;
              -webkit-transition: all 0.4s ease-in-out;
              transition: all 0.4s ease-in-out;
            }
          `}
        </style>
      </>
    );
  };

  //No User Comment Input
  const NoUserCommentInput = () => {
    return (
      <>
        <div className="commentInputMain">
          <img
            src="https://images.macrumors.com/t/XjzsIpBxeGphVqiWDqCzjDgY4Ck=/800x0/article-new/2019/04/guest-user-250x250.jpg?lossy"
            alt="profile_pic"
            aria-label="profile_pic"
            className="profilePic"
          ></img>
          <input
            placeholder="Add a Comment..."
            className="commentInputField"
            id="commentText"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.replace("/login");
              }
            }}
          />
          <div className="buttons">
            <button className="cancelButton">Cancel</button>
            <button
              className="submitButton"
              onClick={() => window.location.replace("/login")}
            >
              Comment
            </button>
          </div>
        </div>

        <style jsx>
          {`
            .commentInputMain {
              margin-left: 50px;
              margin-top: -10px;
              display: flex;
              align-items: center;
            }

            .profilePic {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .commentInputField {
              margin-top: -20px;
              margin-left: 20px;
              width: 700px;
              color: black;
              font-family: var(--mainfont);
              background-color: transparent;
              background-image: linear-gradient(gray, gray);
              background-size: 10% 3px;
              background-repeat: no-repeat;
              background-position: center 110%;
              border: none;
              outline: none;
              transition: all 0.3s ease;
              z-index: 69;
            }

            .commentInputField:focus {
              background-image: linear-gradient(black, white);
              background-size: 100% 3px;
            }

            .buttons {
              display: flex;
              align-items: center;
              margin-top: 50px;
              margin-left: -160px;
            }

            .cancelButton {
              border: none;
              background-color: transparent;
              font-size: 0.8em;
              font-family: var(--mainfont);
            }

            .submitButton {
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
              zoom: 0.85;
            }

            .submitButton:hover {
              background-position: 100% 0;
              -o-transition: all 0.4s ease-in-out;
              -webkit-transition: all 0.4s ease-in-out;
              transition: all 0.4s ease-in-out;
            }
          `}
        </style>
      </>
    );
  };

  //Comment Component
  const Comment = (comment) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(comment.comment.text);

    const editComment = async () => {
      setRenderComments(false);
      //Get Comments
      const temp_comments = realComments;

      //Loop through and update the comment
      for (let i = 0; i < temp_comments.length; i++) {
        const arrcomment = temp_comments[i];
        if (arrcomment.id === comment.comment.id) {
          temp_comments[i].text = text;
          temp_comments[i].timestamp = new Date(Date.now()).toISOString();
        }
      }

      //Send Request to backend
      const res = await axios.post("/api/comment", {
        id: postID,
        comments: temp_comments,
      });
      console.log(res);
      setRealComments(temp_comments);
      setFilteredComments(temp_comments);
      setEditing(false);
      setRenderComments(true);
    };

    const delComment = async () => {
      setRenderComments(false);
      //Get Comments
      const temp_comments = realComments;

      //Loop through and delete the comment
      for (let i = 0; i < temp_comments.length; i++) {
        const arrcomment = temp_comments[i];
        if (arrcomment.id === comment.comment.id) {
          temp_comments.splice(i, 1);
        }
      }

      //Send Request to backend
      const res = await axios.post("/api/comment", {
        id: postID,
        comments: temp_comments,
      });
      console.log(res);
      setRealComments(temp_comments);
      setFilteredComments(temp_comments);
      setEditing(false);
      setRenderComments(true);
    };

    const markAsAnswer = async () => {
      setRenderComments(false);
      //Get Comments
      const temp_comments = realComments;

      //Loop through and delete the comment
      for (let i = 0; i < temp_comments.length; i++) {
        const arrcomment = temp_comments[i];
        if (arrcomment.id === comment.comment.id) {
          temp_comments[i].isAnswer = true;
        }
      }

      //Send Request to backend
      const res = await axios.post("/api/answer", {
        id: postID,
        comments: temp_comments,
        target: true,
      });
      console.log(res);
      setRealComments(temp_comments);
      setFilteredComments(temp_comments);
      setEditing(false);
      setRenderComments(true);
    };

    return (
      <>
        {comment.comment.isAnswer && (
          <>
            <p
              style={{ marginLeft: "50px", fontSize: "1.2em", fontWeight: 500 }}
            >
              Answer
              <i
                className="bx bx-check"
                style={{ zoom: 1.5, color: "green" }}
              ></i>
            </p>
          </>
        )}
        <div className={comment.comment.isAnswer ? "main answered" : "main"}>
          {/* Profile Pic */}
          <img
            src={comment.comment.userProfilePIC}
            alt="profile_pic"
            aria-label="profile_pic"
            className="profilePic"
          ></img>

          {/* Username & date */}
          <div className="subHead">
            <p className="username">
              {comment.comment.username}{" "}
              {comment.comment.isExpertComment && (
                <span
                  style={{
                    color: "var(--royalcolor)",
                    fontFamily: "var(--royalfont)",
                    marginRight: "10px",
                  }}
                >
                  Expert
                </span>
              )}
              <span className="date">
                {moment(comment.comment.timestamp).fromNow()}
              </span>
            </p>

            {/* Check if we are editing */}
            {editing ? (
              <>
                <input
                  className="commentInputField"
                  defaultValue={comment.comment.text}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                ></input>
                <div className="buttons">
                  <button
                    className="cancelButton"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="submitButton"
                    onClick={() => editComment()}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text">{comment.comment.text}</p>
              </>
            )}
          </div>

          {/* Options Dropdown */}
          <div className="dropDownBit">
            <Dropdown>
              <Dropdown.Toggle variant="white" className="remove-after">
                <i className="bx bx-dots-vertical-rounded"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {userID === comment.comment.userID ? (
                  <>
                    <Dropdown.Item
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => delComment()}
                    >
                      <i className="bx bxs-x-circle dropdownIcon"></i>Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => setEditing(true)}
                    >
                      <i className="bx bxs-edit-alt dropdownIcon"></i>Edit
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <a
                      href={`/flag?v=${userID}&c=${comment.comment.id}`}
                      style={{ color: "black" }}
                      onClick={() =>
                        window.location.replace(
                          `/flag?v=${userID}&c=${comment.comment.id}&redirect_url=${window.location.href}`
                        )
                      }
                    >
                      <Dropdown.Item
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i className="bx bxs-flag-alt dropdownIcon"></i>
                        Flag
                      </Dropdown.Item>
                    </a>
                  </>
                )}
                {userID === user.id && (
                  <>
                    <Dropdown.Item
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => markAsAnswer()}
                    >
                      <i className="bx bx-check-double dropdownIcon"></i>Mark as
                      Answer
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <style jsx>
            {`
              .profilePic {
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }

              .answered {
                width: 800px;
                padding-top: 20px;
                padding-bottom: 20px;
                border: 5px solid lightgreen;
              }

              .main {
                margin-left: 48px;
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                width: 800px;
              }

              .subHead {
                display: flex;
                flex-direction: column;
              }

              .username {
                padding-left: 5px;
                font-family: var(--mainfont);
                font-weight: 650;
                font-size: 0.8em;
              }

              .date {
                font-size: 0.85em;
                font-weight: 400;
              }

              .text {
                margin-top: 3px;
                padding-left: 5px;
                width: 600px;
                font-family: var(--mainfont);
              }

              .dropdownIcon {
                zoom: 1.2;
                margin-right: 5px;
              }

              .commentInputField {
                margin-left: 5px;
                width: 595px;
                color: black;
                font-family: var(--mainfont);
                background-color: transparent;
                background-image: linear-gradient(gray, gray);
                background-size: 10% 3px;
                background-repeat: no-repeat;
                background-position: center 110%;
                border: none;
                outline: none;
                transition: all 0.3s ease;
                z-index: 69;
              }

              .commentInputField:focus {
                background-image: linear-gradient(black, white);
                background-size: 100% 3px;
              }

              .buttons {
                display: flex;
                align-items: center;
                margin-top: -13px;
              }

              .cancelButton {
                border: none;
                background-color: transparent;
                font-size: 0.8em;
                font-family: var(--mainfont);
                margin-left: 70%;
              }

              .submitButton {
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
                zoom: 0.85;
              }

              .submitButton:hover {
                background-position: 100% 0;
                -o-transition: all 0.4s ease-in-out;
                -webkit-transition: all 0.4s ease-in-out;
                transition: all 0.4s ease-in-out;
              }

              .dropDownBit {
                /* Nothing IDIOT */
              }

              @media screen and (max-width : 873px){
                .answered {
                  width : 700px;
                }
              }

              @media screen and (max-width : 769px){
                .main {
                  margin-left : 20px;
                }
              }

              @media screen and (max-width : 741px){
                .main {
                  margin-left : 10px;
                  width : 700px;
                }
              }

              @media screen and (max-width : 729px){
                .answered {
                  width : 670px;
                }

                .text {
                  width : 500px;
                  white-space:normal;
                }
              }

              @media screen and (max-width : 704px){
                .answered {
                  border : none;  
                }
              }

              @media screen and (max-width : 680px){
                .text {
                  width : 500px;
                  white-space:normal;
                }
              }

              @media screen and (max-width : 603px){
                .text {
                  width : 400px;
                  white-space:normal;
                }
              }

              @media screen and (max-width : 508px){
                .text {
                  width : 300px;
                  white-space:normal;
                }
              }

              @media screen and (max-width : 404px){
                .text {
                  width : 200px;
                  white-space:normal;
                }
              }

              @media screen and (max-width : 312px){
                .text {
                  width : 150px;
                  white-space:normal;
                }
              }
            `}
          </style>
        </div>
      </>
    );
  };

  return (
    <>
      {renderComments ? (
        <>
          {" "}
          <div className="title">
            {comments.length} Comment{comments.length === 1 ? "" : "s"}
            <Dropdown style={{ marginLeft: "200px" }}>
              <Dropdown.Toggle variant="white">Sort Comments</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortComments("answers")}>
                  Only Answers
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortComments("experts")}>
                  Only Expert Comments
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortComments("newest")}>
                  Newest First
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortComments("top")}>
                  Top Comments
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {signedIN ? <CommentInput /> : <NoUserCommentInput />}
          {filteredComments.map((comment, index) => (
            <>
              <Comment comment={comment} key={index} />
            </>
          ))}
        </>
      ) : (
        <Procrastinator />
      )}

      <style jsx>
        {`
          .title {
            margin-top: 20px;
            margin-left: 50px;
            font-size: 20px;
            font-family: var(--mainfont);
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
