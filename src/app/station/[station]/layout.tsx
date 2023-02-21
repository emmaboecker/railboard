import React from "react";
import { getStationInfoData } from "../../../data/station_info";
import StationBoardTopBar from "./StationBoardTopBar";

export default async function Layout({
  children,
  params,
}: {
  children?: React.ReactNode;
  params?: { station?: string; datetime?: string };
}) {
  const station = parseInt(params?.station ?? "8000105");
  const data = await getStationInfoData(station);

  const datetime = (params?.datetime && parseInt(params.datetime)) || Date.now();

  return (
    <StationBoardTopBar data={data} station={station} datetime={datetime}>
      {children}
    </StationBoardTopBar>
  );
}
