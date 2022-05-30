import React, { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/")
  }, []);
}
