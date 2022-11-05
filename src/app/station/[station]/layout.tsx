import React, { Suspense } from "react";
import { getStationInfoData } from "../../../data/station_info";
import { asyncComponent } from "../../../utils/async_component_fix";

export default async function Layout({ children, params }: {
  children?: React.ReactNode;
  params?: { station?: string };
}) {


  return (
    <div className={"h-screen text-white"}>
      <div
        className={
          "fixed flex h-14 w-full justify-center border-b-4 border-b-zinc-700 bg-zinc-800 text-center align-middle"
        }
      >
        <div className={"m-auto text-lg font-semibold"}>
          <Suspense fallback={""}>
            <StationName stationId={params?.station ?? "8000105"} />
          </Suspense>
        </div>
      </div>
      {children}
    </div>
  );
}

const StationName = asyncComponent(async (props: { stationId: string }) => {
  const data = await getStationInfoData(props.stationId);

  return (
    <h1>{data.name}</h1>
  );
});
