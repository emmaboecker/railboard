import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";
import { stationBoard } from "../../../../requests/vendo/stationBoard";

export default async function Page({ params }: { params: { station: string; datetime: string } }) {
  const data = await stationBoard(params.station, parseInt(params.datetime));

  return (
    <>
      <div className={"h-full w-screen"}>
        <StationBoardDisplayContainer data={data} />
      </div>
    </>
  );
}
