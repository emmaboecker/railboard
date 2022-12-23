"use client";

import { TbTrain } from "react-icons/tb";

export type CoachSequenceProps = {
  lineNummer: string;
  time: string;
};

export default function CoachSequence() {
  return (
    <>
      <button
        className={"z-30 rounded-md bg-zinc-700 p-2 transition-all duration-100 hover:bg-zinc-600"}
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <TbTrain size={24} />
      </button>
    </>
  );
}
