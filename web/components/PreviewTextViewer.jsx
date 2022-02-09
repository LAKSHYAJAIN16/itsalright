import React from "react";

import getRawTextFromRichText from "../lib/getRawTextFromRichText";
import styles from "../styles/Card.module.css";

export default function PreviewTextViewer({ post }) {
  const PreviewText = () => (
    <div>
      {getRawTextFromRichText(post.content, 3).map((object, index) => (
        <>
          {object.style === "none" && (
            <>
              <p className={styles.text}>{object.text}</p>
            </>
          )}

          {object.style === "bold" && (
            <>
              <p className={styles.text}>
                <b>{object.text}</b>
              </p>
            </>
          )}

          {object.style === "underline" && (
            <>
              <p className={styles.text}>
                <u>{object.text}</u>
              </p>
            </>
          )}

          {object.style === "bold underline" && (
            <>
              <p className={styles.text}>
                <u>
                  <b>{object.text}</b>
                </u>
              </p>
            </>
          )}
        </>
      ))}
      <br />
      {post.options.anonymous === false ? (
        <>
          <div className={styles.sub}>
            <img
              src={post.user.profilePic}
              className={styles.profilePic}
              alt="profile_pic"
              aria-label="profile_pic"
            />
            <span style={{ marginLeft: "10px" }}>By {post.user.name}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.sub} style={{justifyContent:"center"}}>
            <span style={{ marginLeft: "0px", zoom: 0.8 }}>
              This has been posted anonymously
            </span>
          </div>
        </>
      )}
    </div>
  );
  return (
    <a href={`/post/${post.id}`}>
      <div className={styles.card}>
        <h1 className={styles.title}>{post.title}</h1>
        <br />
        <PreviewText />
      </div>
    </a>
  );
}
