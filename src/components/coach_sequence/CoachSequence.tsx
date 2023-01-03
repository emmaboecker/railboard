"use client";

import { Bars } from "react-loader-spinner";
import useSWR from "swr";
import coachSequence from "../../requests/coach_sequence/coach_sequence";

export type CoachSequenceProps = {
  lineNummer: string;
  time: string;
  visible: boolean;
};

export default function CoachSequence(props: CoachSequenceProps) {
  const { data } = useSWR(props.lineNummer, (key) => coachSequence(key, props.time), {});

  return (
    <>
      {!data ? (
        <Bars wrapperClass={"m-auto"} color={"#6d28d9"} height={"80"} width={"100"} />
      ) : "error" in data ? (
        <>Wagenreihung nicht gefunden</>
      ) : (
        <>{data.data.istformation.zuggattung}</>
      )}
    </>
  );
}
