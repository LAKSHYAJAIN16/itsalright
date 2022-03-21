import React, { useEffect } from "react";

export default function Redirect() {
  useEffect(() => {
    const isExpert =
      JSON.parse(localStorage.getItem("user"))?.isExpert || false;
    if (isExpert === false) {
      window.location.replace("/connect-rts/sta/user");
    } else if (isExpert === true) {
      window.location.replace("/connect-rts/sta/expert");
    }
  }, []);

  return <div>Redirecting...wait clown</div>;
}
