import React from "react";

import "../styles/globals.css";

import "@fontsource/ubuntu";
import "@fontsource/source-sans-pro";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#6d28d9" />
          <link rel="icon" type="image/png" href="/assets/railboard_favicon_gray.png" />

          <meta name="application-name" content="Railboard" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Railboard" />
          <meta
            name="description"
            content="Railboard is a web-app to easily view information like delay, platform(-changes) of your Trains"
          />
          <meta name="format-detection" content="telephone=yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#6d28d9" />
        </head>
        <body className={"bg-zinc-900"}>{children}</body>
      </html>
    </>
  );
}
