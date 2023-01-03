import React, { Suspense } from "react";
import GoBackButton from "../../../components/ui/button/GoBackButton";
import { getStationInfoData } from "../../../data/station_info";
import { asyncComponent } from "../../../utils/async_component_fix";
import FilterButtonContainer from "./FilterButtonContainer";
import ReloadButton from "./ReloadButton";
import StationShareButton from "./StationShareButton";

export default async function Layout({
  children,
  params,
}: {
  children?: React.ReactNode;
  params?: { station?: string; datetime?: string };
}) {
  const station = parseInt(params?.station ?? "8000105");

  const datetime = (params?.datetime && parseInt(params.datetime)) || Date.now();

  return (
    <div className={"relative h-screen text-white"}>
      <div className={"absolute flex h-14 w-full border-b-4 border-b-zinc-700 bg-zinc-800 align-middle"}>
        <div className={"absolute left-0 ml-3 flex h-full"}>
          <GoBackButton className={"my-[9px]"} />
        </div>
        <div className={"my-auto ml-14 text-lg font-semibold sm:m-auto"}>
          <Suspense fallback={""}>
            <StationName stationId={station} />
          </Suspense>
        </div>
        <div className={"absolute right-0 flex h-full gap-1 px-2"}>
          <ReloadButton stationId={station} className={"my-auto text-sm"} />
          <FilterButtonContainer />
          <StationShareButton className="my-auto text-sm" station={station} datetime={datetime} />
        </div>
      </div>
      <div className="h-full pt-14">{children}</div>
    </div>
  );
}

const StationName = asyncComponent(async (props: { stationId: number }) => {
  const data = await getStationInfoData(props.stationId);

  return <h1>{data.name}</h1>;
});
