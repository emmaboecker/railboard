import React from "react";
import { stationInformation } from "../../../requests/ris/stationInformation";
import StationBoardTopBar from "./StationBoardTopBar";

export default async function Layout({
  children,
  params,
}: {
  children?: React.ReactNode;
  params?: { station?: string; datetime?: string };
}) {
  const station = params?.station ?? "8000105";
  const data = await stationInformation(station);

  const datetime = (params?.datetime && parseInt(params.datetime)) || Date.now();

  return (
    <StationBoardTopBar data={data} station={station} datetime={datetime}>
      {children}
    </StationBoardTopBar>
  );
}
