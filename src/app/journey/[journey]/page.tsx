import journeyDetails from "../../../requests/vendo/journeyDetails";
import React from "react";
import StopTimeDisplay from "./StopTimeDisplay";
import clsx from "clsx";
import NoticeDisplay from "./NoticeDisplay";
import GoBackButton from "../../../components/ui/button/GoBackButton";
import JourneyShareButton from "./JourneyShareButton";

export const revalidate = 60;

export default async function Page({ params }: { params: { journey: string } }): Promise<JSX.Element> {
  const data = await journeyDetails(params.journey);

  console.log(JSON.stringify(data));

  return (
    <>
      <div className={"h-screen text-white"}>
        <div className={"fixed z-10 flex h-14 w-full justify-between border-b-4 border-b-zinc-700 bg-zinc-800"}>
          <div className={"text-md my-auto ml-3 mr-1 flex flex-row gap-1 truncate font-semibold sm:gap-2 sm:text-lg"}>
            <GoBackButton />
            <div className={"my-auto "}>{data.name}</div>
            <div className={"my-auto text-sm uppercase text-zinc-400"}>nach</div>
            <div className={"my-auto truncate"}>{data.destination}</div>
          </div>
          <JourneyShareButton journey={data} journeyId={params.journey} className="my-auto mr-2 text-sm" />
        </div>
        <div className={"flex w-full pt-14 align-middle"}>
          <div className={"flex flex-col gap-0 p-2 text-lg font-bold text-zinc-400 sm:m-auto sm:flex-row sm:gap-1"}>
            <span className={"text-white"}>
              {data.name} {data.productType === "RB" && `(${data.verkehrsmittelNummer})`}
            </span>
            {data.attributes.find((value) => value.key === "OP") && (
              <>
                betrieben durch
                <span className={"text-white"}>{data.attributes.find((value) => value.key === "OP")?.text}</span>
              </>
            )}
          </div>
        </div>
        <div className={"mb-5 flex w-full flex-col gap-1 p-2"}>
          {data.notes.map((notice) => (
            <NoticeDisplay text={notice} key={notice} color={"red"} />
          ))}
          {data.himNotices.map((notice) => (
            <NoticeDisplay text={notice.text} key={notice.text} color={"gray"} />
          ))}
          <div className={"mt-2 flex flex-col text-zinc-300"}>
            <h3 className={"text-lg font-semibold text-zinc-100"}>Fahrplan</h3>
            <p>{data.schedule.regularSchedule}</p>
            <p>{data.schedule.daysOfOperation}</p>
          </div>
        </div>
        <div className={"h-screen w-full"}>
          {data.stops.map((stop) => {
            const scheduledPlatform = stop.platform;
            const platform = stop.realtimePlatform;

            const isDifferentPlatform =
              scheduledPlatform != null ? (platform != null ? scheduledPlatform !== platform : undefined) : undefined;

            return (
              <div className="flex min-h-[5.5rem] w-full flex-row border-t-[1px] border-zinc-600 p-2" key={stop.name}>
                <div className={"w-full min-w-[100px] max-w-[120px]"}>
                  <StopTimeDisplay
                    arrivalTime={{
                      scheduled: stop.arrival?.scheduled,
                      realtime: stop.arrival?.realtime,
                    }}
                    departureTime={{
                      scheduled: stop.departure?.scheduled,
                      realtime: stop.departure?.realtime,
                    }}
                  />
                </div>
                <div className="flex w-full flex-col justify-start truncate pr-4 align-middle">
                  <div className={"mr-6 truncate text-lg font-bold"}>{stop.name}</div>
                  {stop.attributes.length > 0 && (
                    <>
                      {stop.attributes.map((notice) => (
                        <div className={"truncate text-zinc-300"} key={notice.text}>
                          {notice.text}
                        </div>
                      ))}
                    </>
                  )}
                  {stop.serviceNote && <div className={"truncate text-red-500"}>{stop.serviceNote.text}</div>}
                  {stop.notes.length > 0 && (
                    <>
                      {stop.notes.map((notice) => (
                        <div className={"truncate text-red-500"} key={notice}>
                          {notice}
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {stop.platform != null && (
                  <div className={"absolute right-0 z-0 mr-2 flex flex-row rounded-md bg-zinc-700 p-1"}>
                    <div className={"m-auto flex flex-row"}>
                      <p className={""}>Gl.</p>
                      <div
                        className={clsx("my-auto pl-1", isDifferentPlatform === true && "text-red-500 line-through")}
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
