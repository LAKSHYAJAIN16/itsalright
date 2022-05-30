import React, { useEffect, useState } from "react";

import Procrastinator from "../components/Procrastinator";

export default function Home() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <>
      <Procrastinator />
    </>
  );
}
