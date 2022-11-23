import journeyDetails from "../../../requests/vendo/journeyDetails";
import React from "react";
import StopTimeDisplay from "./StopTimeDisplay";
import clsx from "clsx";
import NoticeDisplay from "./NoticeDisplay";
import GoBackButton from "../../../components/ui/button/GoBackButton";
import JourneyShareButton from "./JourneyShareButton";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: { journey: string };
}): Promise<JSX.Element> {
  const data = await journeyDetails(params.journey);

  return (
    <>
      <div className={"h-screen text-white"}>
        <div
          className={
            "fixed z-10 flex h-14 w-full justify-between border-b-4 border-b-zinc-700 bg-zinc-800"
          }
        >
          <div
            className={
              "text-md my-auto ml-3 mr-1 flex flex-row gap-1 truncate font-semibold sm:gap-2 sm:text-lg"
            }
          >
            <GoBackButton />
            <div className={"my-auto "}>{data.mitteltext}</div>
            <div className={"my-auto text-sm uppercase text-zinc-400"}>
              nach
            </div>
            <div className={"my-auto truncate"}>{data.richtung}</div>
          </div>
          <JourneyShareButton
            journey={data}
            journeyId={params.journey}
            className="my-auto mr-2 text-sm"
          />
        </div>
        <div className={"flex w-full pt-14 align-middle"}>
          <div
            className={
              "flex flex-col gap-0 p-2 text-lg font-bold text-zinc-400 sm:m-auto sm:flex-row sm:gap-1"
            }
          >
            <span className={"text-white"}>
              {data.mitteltext}{" "}
              {data.produktGattung === "RB" && `(${data.verkehrsmittelNummer})`}
            </span>
            {data.attributNotizen.find((value) => value.key === "OP") && (
              <>
                betrieben durch
                <span className={"text-white"}>
                  {
                    data.attributNotizen.find((value) => value.key === "OP")
                      ?.text
                  }
                </span>
              </>
            )}
          </div>
        </div>
        <div className={"mb-5 flex w-full flex-col gap-1 p-2"}>
          {data.echtzeitNotizen.map((notice) => (
            <NoticeDisplay text={notice.text} key={notice.text} color={"red"} />
          ))}
          {data.himNotizen.map((notice) => (
            <NoticeDisplay
              text={notice.text}
              key={notice.text}
              color={"gray"}
            />
          ))}
          <div className={"mt-2 flex flex-col text-zinc-300"}>
            <h3 className={"text-lg font-semibold text-zinc-100"}>Fahrplan</h3>
            <p>{data.fahrplan.regulaererFahrplan}</p>
            <p>{data.fahrplan.tageOhneFahrt}</p>
          </div>
        </div>
        <div className={"h-screen w-full"}>
          {data.halte.map((stop) => {
            const scheduledPlatform = stop.gleis;
            const platform = stop.ezGleis;

            const isDifferentPlatform =
              scheduledPlatform != null
                ? platform != null
                  ? scheduledPlatform !== platform
                  : undefined
                : undefined;

            return (
              <div
                className="flex min-h-[5.5rem] w-full flex-row border-t-[1px] border-zinc-600 p-2"
                key={stop.ort}
              >
                <div className={"w-full min-w-[100px] max-w-[120px]"}>
                  <StopTimeDisplay
                    arrivalTime={{
                      scheduled: stop.ankunftsDatum,
                      realtime: stop.ezAnkunftsDatum,
                    }}
                    departureTime={{
                      scheduled: stop.abgangsDatum,
                      realtime: stop.ezAbgangsDatum,
                    }}
                  />
                </div>
                <div className="flex w-full flex-col justify-start truncate pr-4 align-middle">
                  <div className={"mr-6 truncate text-lg font-bold"}>
                    {stop.ort}
                  </div>
                  {stop.attributNotizen.length > 0 && (
                    <>
                      {stop.attributNotizen.map((notice) => (
                        <div
                          className={"truncate text-zinc-300"}
                          key={notice.text}
                        >
                          {notice.text}
                        </div>
                      ))}
                    </>
                  )}
                  {stop.serviceNotiz && (
                    <div className={"truncate text-red-500"}>
                      {stop.serviceNotiz.text}
                    </div>
                  )}
                  {stop.echtzeitNotizen.length > 0 && (
                    <>
                      {stop.echtzeitNotizen.map((notice) => (
                        <div
                          className={"truncate text-red-500"}
                          key={notice.text}
                        >
                          {notice.text}
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {stop.gleis != null && (
                  <div
                    className={
                      "absolute right-0 z-0 mr-2 flex flex-row rounded-md bg-zinc-700 p-1"
                    }
                  >
                    <div className={"m-auto flex flex-row"}>
                      <p className={""}>Gl.</p>
                      <div
                        className={clsx(
                          "my-auto pl-1",
                          isDifferentPlatform === true &&
                            "text-red-500 line-through"
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
