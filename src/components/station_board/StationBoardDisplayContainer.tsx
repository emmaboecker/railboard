"use client";

import { useElementSize } from "@mantine/hooks";
import { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import StationBoardDisplayElement from "./StationBoardDisplayElement";
import { StationBoardResponse } from "../../data/station_board";
import { useRouter } from "next/navigation";

export type StationBoardDisplayContainerProps = {
  data: StationBoardResponse;
};

export default function StationBoardDisplayContainer(
  props: StationBoardDisplayContainerProps
): JSX.Element {
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const trainData = props.data.trains[index]!;

    const router = useRouter()

    return (
      <div style={style}>
        <button
          className={
            "h-full w-full border-b-[1px] border-zinc-600 pr-2 hover:bg-zinc-800/50"
          }
          key={trainData.journeyId}
          onClick={() => {
            router.push(`/journey/${encodeURIComponent(trainData.journeyId)}`)
          }}
        >
          <StationBoardDisplayElement train={trainData} />
        </button>
      </div>
    );
  };

  const { ref, width, height } = useElementSize();

  return (
    <div className={"flex h-full w-full"} ref={ref}>
      <List
        itemSize={100}
        height={height}
        itemCount={props.data.trains.length}
        width={width}
      >
        {Row}
      </List>
    </div>
  );
}
