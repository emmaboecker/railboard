import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <>
      <Html>
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Railboard" />
          <meta
            property="og:description"
            content="Railboard is a simple web-app to view mainly German Stationboards"
          />
          <meta property="og:site_name" content="Railboard" />
          <meta property="og:url" content="https://rail.stckoverflw.net" />

          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body className={"bg-zinc-900"}>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
