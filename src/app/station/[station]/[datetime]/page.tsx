import getStationBoardData from "../../../../data/station_board";
import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";

export default async function Page({ params }: {
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
