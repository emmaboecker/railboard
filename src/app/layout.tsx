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
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#6d28d9" />
        </head>
        <body className={"bg-zinc-900"}>{children}</body>
      </html>
    </>
  );
}
