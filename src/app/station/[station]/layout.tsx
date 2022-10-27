import React from "react";
import { getStationInfoData } from "../../../data/station_info";

export default async function Layout({
  children,
  params,
}: {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { station?: string };
}) {
  const data = await getStationInfoData(params?.station ?? "8000105");

  return (
    <div className={"h-screen text-white"}>
      <div
        className={
          "fixed flex h-14 w-full justify-center border-b-4 border-b-zinc-700 bg-zinc-800 text-center align-middle"
        }
      >
        <div className={"m-auto text-lg font-semibold"}>{data.name}</div>
      </div>
      {children}
    </div>
  );
}
