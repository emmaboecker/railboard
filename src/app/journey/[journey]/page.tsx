import journeyDetails from "../../../requests/vendo/journeyDetails";
import React from "react";
import GoBackButton from "./GoBackButton";
import StopTimeDisplay from "./StopTimeDisplay";
import clsx from "clsx";
import NoticeDisplay from "./NoticeDisplay";

export default async function Page({ params }: { params: { journey: string } }): Promise<JSX.Element> {
  const data = await journeyDetails(params.journey);

  return (
    <>
      <div className={"h-screen text-white"}>
        <div
          className={
            "fixed flex h-14 border-b-4 border-b-zinc-700 bg-zinc-800 w-full justify-start z-10"
          }
        >
          <div className={"flex flex-row gap-1 sm:gap-2 my-auto ml-3 text-md sm:text-lg font-semibold truncate mr-1"}>
            <GoBackButton />
            <div className={"my-auto "}>
              {data.normalName}
            </div>
            <div className={"my-auto text-sm uppercase text-zinc-400"}>
              nach
            </div>
            <div className={"my-auto truncate"}>
              {data.direction}
            </div>
          </div>
          <div className={"absolute flex h-full px-3 right-0"}>
          </div>
        </div>
        <div className={"flex align-middle pt-14 w-full"}>
          <div className={"flex flex-col sm:flex-row gap-0 sm:gap-1 sm:m-auto text-lg font-bold p-2 text-zinc-400"}>
            <span className={"text-white"}>{data.normalName} {data.productType === "RB" && `(${data.vehicleNumber})`}</span>
            betrieben durch
            <span className={"text-white"}>
              {data.attributeNotices.find(value => value.key === "OP")?.text}
            </span>
          </div>
        </div>
        <div className={"flex flex-col gap-1 p-2 mb-5 w-full"}>
          {data.himNotices.map(notice => (
            <NoticeDisplay text={notice.text} key={notice.text} />
          ))}
        </div>
        {/*<div className={"pt-14 whitespace-pre"}>*/}
        {/*  {JSON.stringify(data, null, "\t")}*/}
        {/*</div>*/}
        <div className={"h-screen w-full"}>
          {data.stops.map(stop => {
            const scheduledPlatform = stop.platform;
            const platform = stop.realtimePlatform;

            const isDifferentPlatform =
              scheduledPlatform != null
                ? platform != null
                  ? scheduledPlatform !== platform
                  : undefined
                : undefined;

            return (
              <div className="flex w-full flex-row border-t-[1px] border-zinc-600 p-2 min-h-[5.5rem]"
                   key={stop.station}>
                <div className={"w-full min-w-[100px] max-w-[120px]"}>
                  <StopTimeDisplay
                    arrivalTime={stop.arrivalTime}
                    departureTime={stop.departureTime}
                  />
                </div>
                <div className="flex w-full flex-col truncate pr-4 align-middle justify-start">
                  <div className={"text-lg font-bold truncate mr-6"}>{stop.station}</div>
                  {stop.attributeNotices.length > 0 && (
                    <>
                      {stop.attributeNotices.map(notice => (
                        <div className={"text-zinc-300 truncate"} key={notice.text}>
                          {notice.text}
                        </div>
                      ))}
                    </>
                  )}
                  {stop.serviceNotice && (
                    <div className={"text-red-500 truncate"}>
                      {stop.serviceNotice.text}
                    </div>
                  )}
                  {stop.realtimeNotices.length > 0 && (
                    <>
                      {stop.realtimeNotices.map(notice => (
                        <div className={"text-red-500 truncate"} key={notice.text}>
                          {notice.text}
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {stop.platform != null && (
                  <div className={"absolute right-0 flex flex-row p-1 z-0 bg-zinc-700 rounded-md mr-2"}>
                    <div className={"flex flex-row m-auto"}>
                      <p className={""}>Gl.</p>
                      <div
                        className={clsx(
                          "my-auto pl-1",
                          isDifferentPlatform === true && "text-red-500 line-through"
                        )}
                      >
                        {scheduledPlatform}
                      </div>
                      {isDifferentPlatform === true && (
                        <>
                          <div className={"my-auto pl-1"}>{platform}</div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </>
  );
}