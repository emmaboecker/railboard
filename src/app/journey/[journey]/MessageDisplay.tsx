"use client";

import { IoIosInformationCircle } from "react-icons/io";
import { useState } from "react";
import clsx from "clsx";

export default function MessageDisplay(props: {
  text: string;
  shortText?: string;
  color: "gray" | "red";
  showIcon?: boolean;
  disabled?: boolean;
}) {
  const [clicked, setClicked] = useState(false);

  const markup = { __html: props.shortText && !clicked ? props.shortText : props.text };

  if (!props.disabled) {
    return (
      <button
        className={clsx(
          "m-auto mr-5 ml-0 flex flex-row justify-start gap-2 text-start",
          !clicked && "w-full truncate",
          props.color === "gray" ? "text-zinc-200" : "text-red-400"
        )}
        onClick={() => {
          setClicked((prevState) => !prevState);
        }}
        disabled={props.disabled}
      >
        {props.showIcon && (
          <IoIosInformationCircle
            size={26}
            className={"my-auto min-w-fit"}
            color={props.color === "gray" ? "gray" : "#f87171"}
          />
        )}
        <span
          className={"my-auto"}
          dangerouslySetInnerHTML={clicked ? markup : undefined}
          children={!clicked ? (props.shortText && !clicked ? props.shortText : props.text) : undefined}
        ></span>
      </button>
    );
  }

  return (
    <div
      className={clsx(
        "m-auto mr-5 ml-0 flex flex-row gap-2 text-start",
        props.color === "gray" ? "text-zinc-200" : "text-red-400"
      )}
    >
      {props.showIcon && (
        <IoIosInformationCircle
          size={26}
          className={"my-auto min-w-fit"}
          color={props.color === "gray" ? "gray" : "#f87171"}
        />
      )}
      <span className={"my-auto"} dangerouslySetInnerHTML={markup}></span>
    </div>
  );
}
