import { stationInformation } from "../../../requests/ris/stationInformation";

export default async function Head({
  params,
}: {
  params: { station: string };
}) {
  const data = await stationInformation(params.station);

  return (
    <>
      <title>{`${data.names.nameLong} - StationBoard | Railboard`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${data.names.nameLong} auf Railboard`} />
      <meta
        property="og:description"
        content={`Aktuelle Abfahrten und Ankünfte von ${data.names.nameLong} auf Railboard.`}
      />
      <meta property="og:site_name" content="Railboard" />
      <meta property="og:url" content="https://rail.stckoverflw.net" />
    </>
  );
}
