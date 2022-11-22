import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { IoIosInformationCircle } from "react-icons/io";
import React from "react";

export default function RailboardInfo() {
  return (
    <div className={"flex flex-row w-full justify-center align-middle"}>
      <Link
        href={"https://github.com/StckOverflw/railboard"}
        className={"flex flex-row gap-2 h-full align-middle p-2 hover:bg-zinc-800 transition-all duration-200 rounded-md my-auto"}
        target={"_blank"}
      >
        <FaGithub size={28} color={"white"} className={"m-auto"} />
        <p className={"text-xl m-auto"}>GitHub</p>
      </Link>
      <div className={"bg-zinc-700 w-10 h-2 my-auto mx-2 rounded-md"} />
      <Link href={"/about"} className={"flex flex-row gap-2 h-full align-middle p-2 hover:bg-zinc-800 transition-all duration-200 rounded-md"}>
        <IoIosInformationCircle size={28} className={"m-auto"} />
        <p className={"text-xl m-auto"}>Über Railboard</p>
      </Link>
    </div>
  );
}