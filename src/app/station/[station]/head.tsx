import React from "react";
import { getStationInfoData } from "../../../data/station_info";

export default async function Head({
  params,
}: {
  params: { station: string };
}) {
  const data = await getStationInfoData(parseInt(params.station));

  return (
    <>
      <title>{`${data.name} - StationBoard | Railboard`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${data.name} auf Railboard`} />
      <meta
        property="og:description"
        content={`Aktuelle Abfahrten und Ankünfte von ${data.name} auf Railboard.`}
      />
      <meta property="og:site_name" content="Railboard" />
      <meta property="og:url" content="https://rail.stckoverflw.net" />
    </>
  );
}
