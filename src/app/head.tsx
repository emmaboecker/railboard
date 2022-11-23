import React from "react";

export default async function Head() {
  return (
    <>
      <title>{`Railboard`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Railboard" />
      <meta
        property="og:description"
        content="Railboard is a simple web-app to view mainly German Stationboards"
      />
      <meta property="og:site_name" content="Railboard" />
      <meta property="og:url" content="https://rail.stckoverflw.net" />
    </>
  );
}
