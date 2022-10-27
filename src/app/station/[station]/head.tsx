import React from "react";
import { getStationInfoData } from "../../../data/station_info";

export default async function Head({
  params,
}: {
  params: { station: string };
}) {
  const data = await getStationInfoData(params.station);

  return (
    <>
      <title>{`${data.name} - StationBoard | Railboard`}</title>
    </>
  );
}
