import React from "react";

export default function Procrastinator() {
  return (
    <>
      <div className="dotcontainer">
        <span className="first dot">.</span>
        <span className="second dot">.</span>
        <span className="third dot">.</span>
      </div>
      <style jsx>
          {`
          .dot {
              font-family : var(--mainfont);
              font-size : 4em;
              text-align : center;
              margin-left : 10px;
              animation : anim 3s ease-in-out infinite;
          }

          .dotcontainer {
              display : flex;
              justify-content : center;
          }

          .first {
              animation-delay : 0.1s;
          }

          .second {
              animation-delay : 0.3s;
          }

          .third {
              animation-delay : 0.5s;
          }

          @keyframes anim {
              20%{
                  transform : translateY(0px);
              }
              50%{
                  transform : translateY(-100px);
              }
              100%{
                  transform : translateY(0px);
              }
          }
          `}
      </style>
    </>
  );
}
