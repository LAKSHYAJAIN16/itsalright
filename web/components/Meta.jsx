import React from "react";

import Head from "next/head";

export default function Meta({ title, desc }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="og:title" content={title} />
      <meta name="og:desc" content={desc} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
