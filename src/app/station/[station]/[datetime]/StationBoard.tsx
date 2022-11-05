"use client";

import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";
import { StationBoardResponse } from "../../../../data/station_board";

export default function StationBoard({
  data,
}: {
  data: StationBoardResponse;
}): JSX.Element {
  return (
    <div className={"h-screen w-screen pt-14"}>
      <StationBoardDisplayContainer data={data} />
    </div>
  );
}
