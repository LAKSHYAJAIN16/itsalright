import React from "react";

export default function DangerModal({ text, nextFN, closeFN }) {
  return (
    <>
      <div className="modal">
        <h1 style={{ color: "red" }}>You Sure about that?</h1>
        <br />
        <p style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>
          Not to be dramatic or anything, but if you click this, {" "}
          <b>{text}.</b>
        </p>
        <br />
        <p>You Sure?</p>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="greenButton"
            style={{ marginRight: "4vw" }}
            onClick={() => nextFN()}
          >
            Yep
          </button>
          <button className="redButton" onClick={() => closeFN()}>
            Nah
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            position: fixed;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-left: 35vw;
            margin-top: 50px;
            z-index: 1696969696969;
            width: 30vw;
            height: 30vw;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
              rgba(0, 0, 0, 0.12) 0px -12px 30px,
              rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
            animation : fade 0.5s ease;
          }

          @keyframes fade {
              0% {
                  opacity : 0;
              }

              100% {
                  opacity : 1;
              }
          }
        `}
      </style>
    </>
  );
}
