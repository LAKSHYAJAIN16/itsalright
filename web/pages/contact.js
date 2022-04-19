import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Meta from "../components/Meta";
import Expert from "../components/Expert";
import Procrastinator from "../components/Procrastinator";
import Navbar from "../components/Navbar";

export default function contact() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [renderResults, setRenderResults] = useState(false);

  useEffect(async () => {
    //First Check if we are signed in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/login");
    } else if (user) {
      setRenderResults(false);

      //Get The Experts
      const res = await axios.get("/api/contact/randomUsers");
      setResults(res.data.data);
      setUsers(res.data.data);

      setRenderResults(true);
    }
  }, []);

  const filter = (searchTerm) => {
    setRenderResults(false);

    //Loop through
    const searched = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        searched.push(users[i]);
      }
    }
    setResults(searched);
    setRenderResults(true);
  };

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <Meta
        title={"Contact Experts"}
        desc={
          "Contact Doctors, Teachers, Motivational Speakers, etc on itsalright"
        }
      />
      <div className="bg" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="content">
          <h1 className="header">Contact Experts</h1>
          <p className="desc">
            <span style={{ fontFamily: "var(--logofont)" }}>Itsalright</span>{" "}
            offers a platform where you can message certified experts, free of
            cost
          </p>
          <div className="searchBox">
            <i className="bx bx-search searchIcon"></i>
            <input
              type="text"
              className="searchInput"
              placeholder="Search for an expert..."
              onChange={(e) => filter(e.target.value)}
            />
          </div>
          {renderResults ? (
            <>
              <div className="searchResults">
                {results.map((value, idx) => (
                  <>
                    <Expert key={idx} user={value} />
                  </>
                ))}
              </div>
            </>
          ) : (
            <Procrastinator />
          )}
        </div>
      </div>
      <style jsx>
        {`
          .header {
            font-family: var(--mainfont);
            font-weight: 300;
            font-size: 2.4em;
            text-align: center;
          }

          .desc {
            font-family: var(--mainfont);
            font-weight: 300;
            text-align: center;
          }

          .searchBox {
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 10px;
            width: 600px;
            height: 50px;
            display: flex;
            align-items: center;
            border-radius: 14px;
            border: 2px solid black;
            zoom: 0.8;
          }

          .searchIcon {
            zoom: 2;
          }

          .searchInput {
            width: 100%;
            font-family: var(--mainfont);
            font-size: 1.2em;
            background-color: transparent;
            border: none;
            outline: none;
          }

          .searchInput:focus {
            border: none;
            outline: none;
          }

          .searchResults {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }

          @media screen and (max-width: 656px) {
            .searchBox {
              zoom: 0.7;
            }
          }

          @media screen and (max-width: 435px) {
            .searchBox {
              zoom: 0.6;
            }
          }

          @media screen and (max-width: 383px) {
            .searchBox {
              zoom: 0.5;
            }

            .desc {
              zoom: 0.9;
            }
          }

          @media screen and (max-width: 312px) {
            .header {
              zoom: 0.9;
            }
          }

          @media screen and (max-width: 300px) {
            .searchBox {
              zoom: 0.4;
            }
          }
        `}
      </style>
    </>
  );
}
