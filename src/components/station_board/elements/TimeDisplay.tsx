import clsx from "clsx";
import { formatTime } from "../../../utils/time";
import { Time } from "../../../data/station_board";

export type TimeDisplayProps = {
  arrivalTime?: Time;
  departureTime?: Time;
};

export default function TimeDisplay(props: TimeDisplayProps): JSX.Element {
  const scheduledArrival = props.arrivalTime?.scheduledTime;
  const actualArrival = props.arrivalTime?.time;

  const scheduledDepart = props.departureTime?.scheduledTime;
  const actualDepart = props.departureTime?.time;

  return (
    <div className={"flex h-full w-full flex-row justify-center align-middle"}>
      {scheduledArrival && (
        <InternalTimeDisplay
          scheduledTime={scheduledArrival}
          time={actualArrival}
        />
      )}
      {scheduledDepart && (
        <InternalTimeDisplay
          scheduledTime={scheduledDepart}
          time={actualDepart}
        />
      )}
    </div>
  );
}

function InternalTimeDisplay(props: {
  scheduledTime: string;
  time?: string;
}): JSX.Element {
  const isTooLate = props.time
    ? new Date(props.scheduledTime).getTime() !== new Date(props.time).getTime()
    : undefined;

  const scheduledTime = new Date(props.scheduledTime.toString());
  const time = props.time != null ? new Date(props.time.toString()) : undefined;

  const diffSeconds = ((time?.getTime() ?? 0) - scheduledTime.getTime()) / 1000;
  const diffMins = Math.floor(diffSeconds / 60);

  return (
    <div
      className={clsx(
        "m-auto flex w-full flex-col justify-center align-middle"
      )}
    >
      <div className={clsx("m-auto flex flex-col")}>
        <p
          className={clsx(
            isTooLate == null
              ? "text-white"
              : isTooLate
              ? "text-sm text-white line-through"
              : "text-white"
          )}
        >
          {formatTime(scheduledTime)}
        </p>
        {isTooLate && <p className={"text-md text-red-500"}>(+{diffMins})</p>}
      </div>
      {time && (
        <>
          <div
            className={clsx(
              "m-auto text-lg",
              isTooLate == null || isTooLate ? "text-red-500" : "text-green-500"
            )}
          >
            {formatTime(time)}
          </div>
        </>
      )}
    </div>
  );
}
