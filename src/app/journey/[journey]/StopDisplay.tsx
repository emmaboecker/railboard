"use client";

import { RisJourneyStop } from "../../../requests/ris/journeyDetails";
import { useState } from "react";
import StopDetailsPopup from "../../../components/station_board/details/StopDetailsPopup";
import StopTimeDisplay from "./StopTimeDisplay";
import MessageDisplay from "./MessageDisplay";
import PlatformDisplay from "../../../components/station_board/elements/PlatformDisplay";
import clsx from "clsx";

export default function StopDisplay(props: {
  stop: RisJourneyStop;
  stops: RisJourneyStop[];
  index: number;
  commonMessages: string[];
}) {
  const stop = props.stop;

  const scheduledPlatform = stop.scheduledPlatform;
  const platform = stop.realPlatform;

  const commonMessages = props.commonMessages;

  const [open, setOpen] = useState(false);

  return (
    <>
      <StopDetailsPopup open={open} setOpen={setOpen} stop={stop} />
      <button
        className="pointer-events-auto z-10 flex min-h-[5.5rem] w-full flex-row border-t-[1px] border-zinc-600 p-2 hover:bg-zinc-800/50"
        onClick={() => setOpen(true)}
      >
        <div className={"flex w-full flex-row justify-start"}>
          <div className={clsx("w-full min-w-[100px] max-w-[120px]")}>
            <StopTimeDisplay
              arrivalTime={{
                scheduled: stop.arrival?.scheduled,
                realtime: stop.arrival?.realtime,
                cancelled: stop.arrival?.cancelled,
                additional: stop.arrival?.additional,
                timeType: stop.arrival?.timeType,
              }}
              departureTime={{
                scheduled: stop.departure?.scheduled,
                realtime: stop.departure?.realtime,
                cancelled: stop.departure?.cancelled,
                additional: stop.departure?.additional,
                timeType: stop.arrival?.timeType,
              }}
            />
          </div>
          <div className="flex w-full flex-col justify-start truncate pr-4">
            <div
              className={clsx(
                "mr-6 w-fit truncate text-lg font-bold",
                (stop.departure?.cancelled ?? true) && (stop.arrival?.cancelled ?? true) && "text-red-400 line-through",
                (stop.departure?.additional ?? true) && (stop.arrival?.additional ?? true) && "text-green-400"
              )}
            >
              {stop.stopName}
            </div>
            {/* Arrival type: {stop.arrival?.timeType}
            Departure type: {stop.departure?.timeType} */}
            {(stop.departure?.cancelled ?? true) && (stop.arrival?.cancelled ?? true) && (
              <p className={"w-fit text-red-500 no-underline"}>Fällt aus</p>
            )}
            {(stop.departure?.additional ?? true) && (stop.arrival?.additional ?? true) && (
              <p className={"w-fit text-green-500 no-underline"}>Zusatzhalt</p>
            )}
            {(stop.departure?.cancelled ?? false) && !(stop.arrival?.cancelled ?? true) && (
              <p className={"w-fit text-red-500 no-underline"}>Abfahrt fällt aus</p>
            )}
            {(stop.departure?.additional ?? false) && !(stop.arrival?.additional ?? true) && (
              <p className={"w-fit text-green-500 no-underline"}>Zusätzliche Abfahrt</p>
            )}
            {!(stop.departure?.cancelled ?? true) && (stop.arrival?.cancelled ?? false) && (
              <p className={"w-fit text-red-500 no-underline"}>Ankunft fällt aus</p>
            )}
            {!(stop.departure?.additional ?? true) && (stop.arrival?.additional ?? false) && (
              <p className={"w-fit text-green-500 no-underline"}>Zusätzliche Ankunft</p>
            )}
            {stop.messages
              .filter(
                (message) =>
                  !commonMessages.includes(message.text) &&
                  (!props.stops[props.index - 1]?.messages.map((m) => m.text).includes(message.text) ?? true)
              )
              .map((message) => (
                <MessageDisplay
                  text={message.text}
                  color={message.type === "CUSTOMER_TEXT" ? "gray" : "red"}
                  key={message.text}
                  showIcon={false}
                  disabled
                />
              ))}
            {stop.disruptions
              .filter((disruption) => props.stops[props.index - 1]?.disruptions.includes(disruption) ?? true)
              .map((disruption) => (
                <MessageDisplay
                  text={disruption.text}
                  shortText={disruption.textShort}
                  color={"gray"}
                  key={disruption.text}
                  showIcon={false}
                  disabled
                />
              ))}
          </div>
          <div className={clsx("absolute right-0 mr-2 flex flex-row")}>
            <PlatformDisplay scheduledPlatform={scheduledPlatform} platform={platform} />
          </div>
        </div>
      </button>
    </>
  );
}
