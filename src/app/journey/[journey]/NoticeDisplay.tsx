"use client";

import { IoIosInformationCircle } from "react-icons/all";
import React, { useState } from "react";
import clsx from "clsx";

export default function NoticeDisplay(props: {text: string}) {
  const [clicked, setClicked] = useState(false)

  return (
    <button
      className={clsx("flex flex-row gap-2 m-auto mr-5 ml-0", !clicked && "w-full truncate")}
      onClick={() => {
        setClicked(prevState => !prevState)
      }}
    >
      <IoIosInformationCircle size={26} className={"my-auto min-w-fit"} color={"gray"} />
      <span className={"my-auto"}>{props.text}</span>
    </button>
  )
}