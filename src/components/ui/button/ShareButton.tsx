"use client";

import { ImShare2 } from "react-icons/im";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Button from "../../../components/ui/button/Button";

export default function ShareButton(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <Button {...props}>
      <ImShare2 size={20} />
    </Button>
  );
}
