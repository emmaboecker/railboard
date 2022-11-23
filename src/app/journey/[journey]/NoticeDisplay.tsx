"use client";

import { IoIosInformationCircle } from "react-icons/io";
import React, { useState } from "react";
import clsx from "clsx";

export default function NoticeDisplay(props: {
  text: string;
  color: "gray" | "red";
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      className={clsx(
        "m-auto mr-5 ml-0 flex flex-row gap-2",
        !clicked && "w-full truncate",
        props.color === "gray" ? "text-zinc-200" : "text-red-500"
      )}
      onClick={() => {
        setClicked((prevState) => !prevState);
      }}
    >
      <IoIosInformationCircle
        size={26}
        className={"my-auto min-w-fit"}
        color={props.color === "gray" ? "gray" : "#ff3939"}
      />
      <span className={"my-auto"}>{props.text}</span>
    </button>
  );
}
