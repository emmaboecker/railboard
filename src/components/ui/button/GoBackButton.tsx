"use client";

import { ImArrowLeft2 } from "react-icons/im";
import React from "react";
import Button from "../../../components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function GoBackButton(props: {className?: string}) {
  const router = useRouter()

  return (
    <Button onClick={() => {
      if (window.history.length > 2) {
        window.history.back()
      } else {
        router.push("/")
      }
    }} {...props} title={"zurück"}>
      <ImArrowLeft2 size={18} className={"m-auto"} />
    </Button>
  )
}