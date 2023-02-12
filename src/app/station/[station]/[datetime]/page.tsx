import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";
import dayjs from "dayjs";
import { stationBoard } from "../../../../requests/custom/stationBoard";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: { station: string; datetime: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let lookbehind = undefined;
  let lookahead = undefined;
  if (searchParams?.lookbehind != null) {
    lookbehind = parseInt(searchParams.lookbehind as string);
  }
  if (searchParams?.lookahead != null) {
    lookahead = parseInt(searchParams.lookahead as string);
  }

  console.log(JSON.stringify(params));

  const date = dayjs(decodeURIComponent(params.datetime));

  const data = await stationBoard(params.station, date, lookbehind, lookahead);

  return (
    <>
      <div className={"h-full w-screen"}>
        <StationBoardDisplayContainer data={data} />
      </div>
    </>
  );
}
