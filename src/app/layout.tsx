import React from "react";

import "../styles/globals.css";

import "@fontsource/ubuntu";
import "@fontsource/source-sans-pro";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Railboard" />
          <meta
            property="og:description"
            content="Railboard is a simple web-app to view mainly German Stationboards"
          />
          <meta property="og:site_name" content="Railboard" />
          <meta property="og:url" content="https://rail.stckoverflw.net" />

          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={"bg-zinc-900"}>{children}</body>
      </html>
    </>
  );
}
