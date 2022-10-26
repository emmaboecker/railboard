import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <>
      <Html>
        <Head />
        <body className={"bg-zinc-900"}>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
