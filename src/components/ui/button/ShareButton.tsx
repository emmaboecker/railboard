"use client";

import { ImShare2 } from "react-icons/im";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, useEffect, useState } from "react";
import Button from "../../../components/ui/button/Button";

export default function ShareButton(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { size?: number }
) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(typeof navigator !== "undefined" && navigator.share == null);
  }, []);

  return (
    <Button {...props} hidden={hidden}>
      <ImShare2 size={props.size ?? 20} />
      {props.children}
    </Button>
  );
}
