import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";
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

  return (
    <>
      <div className={"h-screen w-screen pt-14"}>
        <StationBoardDisplayContainer data={data} />
      </div>
    </>
  );
}
