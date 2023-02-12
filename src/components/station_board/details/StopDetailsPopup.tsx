"use client";

import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { formatTime } from "../../../utils/time";
import Popup from "../../ui/Popup";
import Link from "next/link";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import PlatformDisplay from "../elements/PlatformDisplay";
import { RisJourneyStop } from "../../../requests/ris/journeyDetails";

export default function StopDetailsPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  stop: RisJourneyStop;
}) {
  const scheduledPlatform = props.stop.scheduledPlatform;
  const platform = props.stop.realPlatform;

  dayjs.extend(timezone);

  return (
    <Popup
      onClose={() => props.setOpen(false)}
      open={props.open}
      setOpen={props.setOpen}
      title={<Link href={`/station/${props.stop.stopId}`}>{props.stop.stopName}</Link>}
      className={"flex flex-col gap-3"}
    >
      <div className={"relative flex w-full flex-row justify-start py-3 align-middle"}>
        <div className={"flex w-full flex-grow flex-col justify-start overflow-hidden"}>
          <h3 className={"w-fit text-xl text-zinc-200"}>
            {props.stop.transport.category + " " + (props.stop.transport.line ?? props.stop.transport.number)}{" "}
            {props.stop.transport.line != null &&
              props.stop.transport.line !== props.stop.transport.number.toString() &&
              " (" + props.stop.transport.number + ")"}
          </h3>
          <h5 className="w-fit text-zinc-300">
            {props.stop.administration.name}{" "}
            {props.stop.administration.name !== props.stop.administration.risName && (
              <>({props.stop.administration.risName})</>
            )}
          </h5>
        </div>
        <PlatformDisplay scheduledPlatform={scheduledPlatform} platform={platform} />
      </div>

      <div>
        <div className={"mx-5 flex flex-col justify-center gap-3 xsm:flex-row xsm:gap-10"}>
          {props.stop.arrival != null && (
            <div>
              <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Ankunft</h5>
              <TimeDisplay scheduledTime={props.stop.arrival.scheduled} time={props.stop.arrival.realtime} />
            </div>
          )}
          {props.stop.departure && (
            <div>
              <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Abfahrt</h5>
              <TimeDisplay scheduledTime={props.stop.departure.scheduled} time={props.stop.departure.realtime} />
            </div>
          )}
        </div>
      </div>
      {(props.stop.messages.length > 0 || props.stop.disruptions.length > 0) && (
        <div className={"flex w-full flex-col"}>
          <h4 className={"mx-auto text-xl font-semibold"}>Meldungen</h4>
          <ul className={"list-disc pl-4 text-start"}>
            {props.stop.disruptions.map((disruption) => (
              <li className={"mr-auto list-item text-zinc-100"} key={disruption.text}>
                <>{disruption.text}</>
              </li>
            ))}
            {props.stop.messages.map((message) => (
              <li className={"mr-auto list-item text-red-500"} key={message.text}>
                <>{message.text}</>
              </li>
            ))}
          </ul>
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
