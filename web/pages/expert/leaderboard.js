import axios from "axios";
import React, { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Procrastinator from "../../components/Procrastinator";

export default function Leaderboard() {
  const [render, setRender] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const asyncroh = async () => {
      setRender(false);
      const res = await axios.get("/api/leaderboard");
      const users = res.data.data;
      setUsers(users);
      setRender(true);
    };
    asyncroh();
  }, []);

  return (
    <div className="bg" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="content">
        <main style={{ marginTop: "-10px" }}>
          <h1 className="header">Global Expert Leaderboard</h1>

          <div className="eotm">
            <p className="eotm-head">Expert of the Month : February 2022</p>
            <div className="eotm-content">
              <div id="left">
                <p className="eotm-name">Regulus Geno</p>
                <p className="eotm-desc">
                  A Doctor out of St.Paula Hostpital, New York, In February
                  Regulus answered <b>48</b> questions
                  <br />
                  and sent a total of <b>62</b> messages, bringing his total
                  points to <b>128</b>. Yowza, that's really a lot!
                  <br />
                  Josh has been awarded <b>$38</b> this month for his efforts.
                  Congrats👏!
                </p>
                <p className="eotm-instructions">
                  If you would also like to win Expert of the Month, answer more
                  questions and send more messages! The more people you help,
                  the more points you will gather, and the higher you will move
                  up on the leaderboard. Even if you are online for 15 minutes
                  everyday, you will be a favorite to win Expert of the Month !
                </p>
              </div>

              <div id="right">
                <img
                  src="https://randomuser.me/api/portraits/men/93.jpg"
                  className="eotm-image"
                ></img>
              </div>
            </div>
          </div>

          <br />
          <br />
          <hr />
          <p className="header" style={{ fontSize: "1.6em" }}>
            March 2022 Standings
          </p>
          <br />
          <div className="rankings">
            {/* Index */}
            <div className="ranking">
              <p className="rankings-index">Rank</p>
              <p className="rankings-name">
                Name
              </p>
              <p className="rankings-points">
                <span style={{ marginLeft: "-20px" }}>Answers</span>
              </p>
              <p className="rankings-posts">
                <span style={{ marginLeft: "-20px" }}>Messages</span>
              </p>
              <p className="rankings-messages">
                <span style={{ marginLeft: "-20px" }}>
                  {" "}
                  <b>Points</b>
                </span>
              </p>
            </div>

            {render ? (
              <>
                {users.map((user) => (
                  <>
                    <br />
                    <br />
                    <div className="ranking">
                      <p className="rankings-index">#{user.index}</p>
                      <p className="rankings-name">{user.info.name}</p>
                      <p className="rankings-points">{user.posts}</p>
                      <p className="rankings-posts">{user.messages}</p>
                      <p className="rankings-messages">
                        <b>{user.points}</b>
                      </p>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                <Procrastinator />
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />

      <style jsx>
        {`
          .header {
            text-align: center;
            font-weight: 300;
            color: var(--gold);
          }

          .eotm {
            margin-top: 20px;
            margin-left: 10vw;
          }

          .eotm-content {
            display: flex;
          }

          .eotm-head {
            font-size: 1.2em;
            font-weight: 500;
          }

          .eotm-name {
            font-size: 3em;
            font-weight: 200;
            font-family: var(--mainfont);
          }

          .eotm-image {
            margin-left: 150px;
            width: 170px;
            height: 170px;
            border-radius: 50%;
          }

          .eotm-instructions {
            font-size: 0.7em;
            width: 600px;
          }

          .ranking {
            padding-left: 30px;
          }

          .rankings-index {
            position: absolute;
            font-size: 1.3em;
          }

          .rankings-name {
            position: absolute;
            margin-left: 80px;
            font-size: 1.3em;
          }

          .rankings-points {
            position: absolute;
            margin-left: 500px;
            font-size: 1.3em;
          }

          .rankings-posts {
            position: absolute;
            margin-left: 700px;
            font-size: 1.3em;
          }

          .rankings-messages {
            position: absolute;
            margin-left: 900px;
            font-size: 1.3em;
          }
        `}
      </style>
    </div>
  );
}
