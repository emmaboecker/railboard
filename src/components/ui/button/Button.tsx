"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

export default function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        `rounded-md py-2 px-4 transition-all duration-100`,
        props.disabled ? "bg-zinc-700/60" : "bg-violet-700 hover:bg-violet-800",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
