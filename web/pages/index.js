import React, {useEffect} from "react";
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    //For now, redirect to home page
    window.location.replace("/home");
  }, [])
  return (
    <div>
      <Head>
        <title>Redirecting...</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
