import StationBoard from "./StationBoard";
import getStationBoardData from "../../../../data/station_board";

export default async function Page({
  params,
}: {
  params: { station: string; datetime: string };
}) {
  const data = await getStationBoardData(
    params.station,
    parseInt(params.datetime)
  );

  return <StationBoard data={data} />;
}
