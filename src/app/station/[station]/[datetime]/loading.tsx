"use client";

import { Bars } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className={"fixed flex h-full w-full justify-center align-middle"}>
      <Bars
        wrapperClass={"m-auto"}
        color={"#6d28d9"}
        height={"80"}
        width={"100"}
      />
    </div>
  );
}
