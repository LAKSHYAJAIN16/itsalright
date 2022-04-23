import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

export default function PostExpert() {
  const [f, setF] = useState(false);
  const [SP, setSP] = useState();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setSP(new URL(window.location.href).searchParams);
    setF(true);
  }, []);

  return (
    <>
      <div>
        <Navbar />
        {f && (
          <>
            <p
              style={{
                fontFamily: "var(--mainfont)",
                textAlign: "center",
                fontSize: "4vw",
                fontWeight: "200",
              }}
            >
              Something went Wrong.
            </p>
            <br />
            <p
              style={{
                fontFamily: "var(--mainfont)",
                textAlign: "center",
                fontSize: "2vw",
              }}
            >
              Error : {SP.get("n")}
            </p>

            <br />
            <br />
            <div>
              <p
                style={{
                  fontFamily: "var(--mainfont)",
                  textAlign: "center",
                  fontSize: "1vw",
                }}
              >
                <a href="/home">Back to Home</a>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
