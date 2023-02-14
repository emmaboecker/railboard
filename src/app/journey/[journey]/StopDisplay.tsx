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
          <div className={clsx("w-full min-w-[100px] max-w-[120px]", stop.cancelled && "line-through")}>
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
          <div className="flex w-full flex-col justify-start truncate pr-4">
            <div className={clsx("mr-6 w-fit truncate text-lg font-bold", stop.cancelled && "line-through")}>
              {stop.stopName}
            </div>
            {stop.cancelled && <p className={"w-fit text-red-500 no-underline"}>Fällt aus</p>}
            {stop.messages
              .filter(
                (message) =>
                  !commonMessages.includes(message.text) &&
                  (props.stops[props.index - 1]?.messages.includes(message) ?? true)
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
              .filter((disruption) => !(props.stops[props.index - 1]?.disruptions.includes(disruption) ?? true))
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
          <div className={clsx("absolute right-0 mr-2 flex flex-row", stop.cancelled && "line-through")}>
            <PlatformDisplay scheduledPlatform={scheduledPlatform} platform={platform} />
          </div>
        </div>
      </button>
    </>
  );
}
