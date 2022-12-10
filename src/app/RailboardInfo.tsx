import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { IoIosInformationCircle } from "react-icons/io";
import React from "react";

export default function RailboardInfo() {
  return (
    <div className={"mt-10 flex w-full flex-row justify-center align-middle"}>
      <Link
        href={"https://github.com/StckOverflw/railboard"}
        className={
          "my-auto flex h-full flex-row gap-2 rounded-md p-2 align-middle transition-all duration-200 hover:bg-zinc-800"
        }
        target={"_blank"}
      >
        <FaGithub size={28} color={"white"} className={"m-auto"} />
        <p className={"m-auto text-xl"}>GitHub</p>
      </Link>
      <div className={"my-auto mx-2 h-2 w-10 rounded-md bg-zinc-700"} />
      <Link
        href={"/about"}
        className={
          "flex h-full flex-row gap-2 rounded-md p-2 align-middle transition-all duration-200 hover:bg-zinc-800"
        }
      >
        <IoIosInformationCircle size={28} className={"m-auto"} />
        <p className={"m-auto text-xl"}>Über Railboard</p>
      </Link>
    </div>
  );
}
