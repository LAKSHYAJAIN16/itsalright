import React from "react";
import Link from "next/link";

export default function Expert({ user }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <Link href={`/chat/${user.id}`}>
        <div className="card">
          <img src={user.profilePic} className="profilePic"></img>
          <p className="name">{user.name}</p>
          <p className="desc">{user.expertData.bio}</p>
        </div>
      </Link>
      <style jsx>
        {`
          .card {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding-left: 0px;
            margin-right: 20px;
            margin-top: 30px;
            height: 200px;
            width: 200px;
            border-radius: 25px;
            color: black;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
              rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
            font-family: var(--mainfont);
            transition: all 0.5s ease;
          }

          .card:hover {
            transform: translateY(-20px);
          }

          .profilePic {
            height: 100px;
            width: 100px;
            border-radius: 50%;
          }

          .name {
            margin-top: 7px;
          }

          .desc {
            margin-top: 5px;
            zoom: 0.6;
            color: grey;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
