import React, { useState, useEffect } from "react";
import axios from "axios";

import shuffle from "../lib/shuffle";
import removeDuplicates from "../lib/removeDuplicates";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import PreviewTextViewer from "../components/PreviewTextViewer";
import Procrastinator from "../components/Procrastinator";

export default function browse() {
  const [retrieved, setRetrieved] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const method = async () => {
      if (!retrieved) {
        //Call Backend Endpoint
        const res = await axios.get("/api/posts");

        //Shuffle All Array
        const shuffledAll = shuffle(res.data.all);

        setPosts(removeDuplicates(shuffledAll));
        setRetrieved(true);
      }
    };

    method();
  }, []);

  return (
    <div className="bg" style={{ minHeight: "100vh" }}>
      <Meta
        title={"Browse Posts, Solve Problems"}
        desc={"Help others by solving their problems and posting answers"}
      />
      <Navbar />
      {retrieved ? (
        <>
          <h1 className="heading">Browse</h1>
          <h2 className="subhead">These Problems need Solutions</h2>

          <div className="cards">
            {posts.map((post, index) => (
              <>
                <PreviewTextViewer post={post} key={index} />
              </>
            ))}
          </div>

          <style jsx>
            {`
              .heading {
                font-family: var(--mainfont);
                text-align: center;
                font-weight: 300;
                font-size: 40px;
              }

              .subhead {
                text-align: center;
                font-weight: 400;
                font-size: 1em;
                font-family: var(--mainfont);
              }

              .cards {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
              }
            `}
          </style>
        </>
      ) : (
        <>
          <br />
          <br />
          <Procrastinator />
        </>
      )}
    </div>
  );
}
