import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";
import dayjs from "dayjs";
import { stationBoard } from "../../../../requests/custom/stationBoard";
import { Metadata } from "next";
import { stationInformation } from "../../../../requests/ris/stationInformation";

export const dynamic = "force-dynamic";

type Props = {
  params: { station: string; datetime: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await stationInformation(params.station);

  return {
    title: `${data.names.nameLong} - StationBoard | Railboard`,
    openGraph: {
      type: "website",
      title: `${data.names.nameLong} auf Railboard`,
      description: `Aktuelle Abfahrten und Ankünfte von ${data.names.nameLong} auf Railboard.`,
      siteName: "Railboard",
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
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
