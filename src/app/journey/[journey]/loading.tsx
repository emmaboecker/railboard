"use client";

import { Bars } from "react-loader-spinner";
import GoBackButton from "../../../components/ui/button/GoBackButton";

export default function JourneyLoading() {
  return (
    <>
      <div className={"h-screen text-white"}>
        <div className={"fixed z-10 flex h-14 w-full justify-between border-b-4 border-b-zinc-700 bg-zinc-800"}>
          <div className={"text-md my-auto ml-3 mr-1 flex flex-row gap-1 truncate font-semibold sm:gap-2 sm:text-lg"}>
            <GoBackButton />
          </div>
        </div>
        <div className={"flex h-full w-full justify-center pt-14 align-middle"}>
          <Bars wrapperClass={"m-auto"} color={"#6d28d9"} height={"80"} width={"100"} />
        </div>
      </div>
    </>
  );
}
