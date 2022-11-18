"use client";

import { ImArrowLeft2 } from "react-icons/all";
import React from "react";

export default function GoBackButton() {
  return (
    <button
      className={"bg-violet-600 hover:bg-violet-700 transition-all duration-75 rounded-md p-2"}
      onClick={() => {
        window.history.back()
      }}
    >
      <ImArrowLeft2 />
    </button>
  )
}