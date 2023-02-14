"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import clsx from "clsx";
import { formatTime } from "../../../utils/time";
import Popup from "../../ui/Popup";
import { TailSpin } from "react-loader-spinner";
import { StationBoardItem } from "../../../requests/custom/stationBoard";
import Link from "next/link";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { journeySearch } from "../../../requests/ris/journeySearch";
import PlatformDisplay from "../elements/PlatformDisplay";

export default function DetailsPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  train: StationBoardItem;
}) {
  const scheduledPlatform = props.train.platformScheduled;
  const platform = props.train.platformRealtime;

  const [detailsLoading, setDetailsLoading] = useState(false);

  const messages = props.train.additionalInfo?.messages ?? [];

  const uniqueMessages = messages.filter((element, index) => {
    return (
      (element.messageStatus === "CauseOfDelay" || element.messageStatus === "QualityChange") &&
      messages.findIndex((e) => e.id === element.id || e.matchedText === element.matchedText) === index
    );
  });

  const [journeyId, setJourneyId] = useState<string | undefined>(props.train.risId);

  useEffect(() => {
    if (journeyId != null) return;
    if (!props.open) return;
    journeySearch(
      props.train.category,
      props.train.trainNumber.toString(),
      dayjs(props.train.departure?.timeScheduled ?? props.train.arrival?.timeScheduled)
    ).then((journeys) => {
      const first = journeys[0];
      setJourneyId(first?.journeyID);
    });
  }, [
    journeyId,
    props.open,
    props.train.arrival?.timeScheduled,
    props.train.category,
    props.train.departure?.timeScheduled,
    props.train.trainNumber,
  ]);

  dayjs.extend(timezone);

  return (
    <Popup
      open={props.open}
      setOpen={props.setOpen}
      title={props.train.category + " " + props.train.lineIndicator}
      className={"flex flex-col gap-3"}
    >
      <div className={"relative flex w-full flex-row justify-start py-3 align-middle"}>
        <div className={"w-full flex-grow overflow-hidden"}>
          <table className="my-auto mr-0 max-w-full border-spacing-5">
            <tbody>
              <tr>
                <td className={"text-left font-semibold text-zinc-500"}>Von: </td>
                <td className={"truncate pl-2 text-left"}>
                  {props.train.originEva != null && (
                    <Link href={`/station/${props.train.originEva}`}>{props.train.originName}</Link>
                  )}
                  {props.train.originEva == null && <>{props.train.originName}</>}
                </td>
              </tr>
              <tr>
                <td className={"text-left font-semibold text-zinc-500"}>Nach: </td>
                <td className={"truncate pl-2 text-left"}>
                  <Link href={`/station/${props.train.destinationEva}`}>{props.train.destinationName}</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PlatformDisplay scheduledPlatform={scheduledPlatform} platform={platform} />
      </div>
      <div>
        <div className={"mx-5 flex flex-col justify-center gap-3 xsm:flex-row xsm:gap-10"}>
          {props.train.arrival != null && (
            <div>
              <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Ankunft</h5>
              <TimeDisplay scheduledTime={props.train.arrival.timeScheduled} time={props.train.arrival.timeRealtime} />
            </div>
          )}
          {props.train.departure && (
            <div>
              <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Abfahrt</h5>
              <TimeDisplay
                scheduledTime={props.train.departure.timeScheduled}
                time={props.train.departure.timeRealtime}
              />
            </div>
          )}
        </div>
      </div>
      {uniqueMessages.length > 0 && (
        <div className={"flex w-full flex-col"}>
          <h4 className={"mx-auto text-xl font-semibold"}>Meldungen</h4>
          <div className={"text-red-500"}>
            <ul className={"list-disc pl-4 text-start"}>
              {uniqueMessages.map((message) => (
                <li className={"mr-auto list-item"} key={message.id}>
                  <>
                    {dayjs(message.timestamp, ["DD-MM-YYYYTHH:mm:ss"]).format("HH:mm")}
                    {": "}
                    {message.matchedText ?? message.category ?? message.code ?? message.id}
                  </>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/*{(props.train.product === "ICE" ||*/}
      {/*  props.train.product === "IC_EC" ||*/}
      {/*  props.train.product === "RB") && (*/}
      {/*  <>*/}
      {/*    <h4 className={"text-xl font-semibold"}>Wagenreihung (Coming soon)</h4>*/}
      {/*    {number != null && (*/}
      {/*      <CoachSequence*/}
      {/*        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
      {/*        lineNummer={number[0]!}*/}
      {/*        time={time.format("YYYYMMDDHHmm")}*/}
      {/*        visible={true}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*)}*/}
      <div className={"flex w-full flex-row justify-end"}>
        {journeyId != null ? (
          <Link
            href={`/journey/${encodeURIComponent(journeyId)}`}
            onClick={() => {
              setDetailsLoading(true);
            }}
          >
            <div
              className={
                "flex flex-row gap-1 rounded-md bg-zinc-700/60 py-1 px-2 align-middle transition-all duration-100 hover:bg-zinc-700"
              }
            >
              {detailsLoading ? (
                <TailSpin
                  width={20}
                  height={20}
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <HiExternalLink size={20} className={"my-auto"} />
              )}
              <p>Details</p>
            </div>
          </Link>
        ) : (
          <div
            className={
              "pointer-events-none flex flex-row gap-1 rounded-md bg-zinc-700/60 py-1 px-2 align-middle transition-all duration-100 hover:bg-zinc-700"
            }
          >
            <HiExternalLink size={20} className={"my-auto"} />
            <p>Details</p>
          </div>
        )}
      </div>
    </Popup>
  );
}

function TimeDisplay(props: { scheduledTime: string; time?: string }): JSX.Element {
  const isTooLate = props.time ? new Date(props.scheduledTime).getTime() < new Date(props.time).getTime() : undefined;
  const isTooEarly = props.time ? new Date(props.scheduledTime).getTime() > new Date(props.time).getTime() : undefined;

  const scheduledTime = new Date(props.scheduledTime.toString());
  const time = props.time != null ? new Date(props.time.toString()) : undefined;

  const diffSeconds = ((time?.getTime() ?? 0) - scheduledTime.getTime()) / 1000;
  const diffMins = Math.floor(diffSeconds / 60);

  return (
    <div className={clsx("m-auto flex w-full flex-col items-center justify-center")}>
      <div className={clsx("m-auto flex h-full flex-row items-center gap-1")}>
        <p
          className={clsx(
            "my-auto",
            isTooLate == null || isTooEarly == null
              ? "text-white"
              : (isTooLate || isTooEarly) && (diffMins > 0 || diffMins < 0)
              ? "text-md text-white line-through"
              : "text-white"
          )}
        >
          {formatTime(scheduledTime)}
        </p>
        {isTooLate && diffMins > 0 && <p className={"text-md my-auto text-red-500"}>(+{diffMins})</p>}
        {isTooEarly && diffMins < 0 && <p className={"text-md text-green-500"}>({diffMins})</p>}
      </div>
      {time && (
        <>
          <div className={clsx("m-auto text-lg", isTooLate == null || isTooLate ? "text-red-500" : "text-green-500")}>
            {formatTime(time)}
          </div>
        </>
      )}
    </div>
  );
}
