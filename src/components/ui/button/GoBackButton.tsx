"use client";

import { ImArrowLeft2 } from "react-icons/all";
import React from "react";
import Button from "../../../components/ui/button/Button";

export default function GoBackButton(props: {className?: string}) {
  return (
    <Button onClick={() => window.history.back()} {...props}>
      <ImArrowLeft2 size={18} className={"m-auto"} />
    </Button>
  )
}