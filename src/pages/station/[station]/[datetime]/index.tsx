import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import { Bars } from "react-loader-spinner";
import StationBoardDisplayContainer from "../../../../components/station_board/StationBoardDisplayContainer";

export default function StationBoard(): JSX.Element {
  const router = useRouter();

  const { station, datetime } = router.query;

  const date = datetime ? new Date(parseInt(datetime.toString())) : undefined;

  const { data, isFetching } = trpc.vendo.stationBoard.useQuery(
    {
      stationId: station?.toString() ?? "",
      datetime: date ?? new Date(),
      transportTypes: [],
    },
    {
      enabled: router.isReady && date !== null,
      refetchOnMount: false,
    }
  );

  return (
    <div className={"h-screen text-white"}>
      <div
        className={
          "fixed flex h-14 w-full justify-center border-b-4 border-b-zinc-700 bg-zinc-800 text-center align-middle"
        }
      >
        <div className={"m-auto text-lg font-semibold"}>
          {!isFetching && data !== undefined && data.requestedStationName}
        </div>
      </div>
      {!data || isFetching ? (
        <div className={"fixed flex h-full w-full justify-center align-middle"}>
          <div className={"m-auto"}>
            <Bars color={"#6d28d9"} height={"80"} width={"100"} />
          </div>
        </div>
      ) : (
        <div className={"h-screen w-screen pt-14"}>
          <StationBoardDisplayContainer data={data} />
        </div>
      )}
    </div>
  );
}
