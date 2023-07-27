import clsx from "clsx";
import { formatTime } from "../../../utils/time";

export type TimeDisplayProps = {
  arrivalSchedule?: string;
  arrivalRealtime?: string;
  departureSchedule?: string;
  departureRealtime?: string;
};

export default function TimeDisplay(props: TimeDisplayProps): JSX.Element {
  const scheduledArrival = props.arrivalSchedule;
  const actualArrival = props.arrivalRealtime;

  const scheduledDepart = props.departureSchedule;
  const actualDepart = props.departureRealtime;

  return (
    <div className={"flex h-full w-full flex-row justify-center align-middle"}>
      <div className={"m-auto flex h-full w-full items-center"}>
        {scheduledArrival && <InternalTimeDisplay scheduledTime={scheduledArrival} time={actualArrival} />}
      </div>
      <div className={"m-auto flex h-full w-full items-center"}>
        {scheduledDepart && <InternalTimeDisplay scheduledTime={scheduledDepart} time={actualDepart} />}
      </div>
    </div>
  );
}

export function InternalTimeDisplay(props: {
  scheduledTime: string;
  time?: string;
  cancelled?: boolean;
  additional?: boolean;
  timeType?: string;
}): JSX.Element {
  const isTooLate = props.time ? new Date(props.scheduledTime).getTime() < new Date(props.time).getTime() : undefined;
  const isTooEarly = props.time ? new Date(props.scheduledTime).getTime() > new Date(props.time).getTime() : undefined;

  const scheduledTime = new Date(props.scheduledTime.toString());
  const time = props.time != null ? new Date(props.time.toString()) : undefined;

  const diffSeconds = ((time?.getTime() ?? 0) - scheduledTime.getTime()) / 1000;
  const diffMins = Math.floor(diffSeconds / 60);

  return (
    <div className={clsx("m-auto flex w-full flex-col justify-center align-middle")}>
      <div className={clsx("m-auto flex flex-col text-white")}>
        <p
          className={clsx(
            (isTooLate || isTooEarly) && (diffMins > 0 || diffMins < 0) && "text-sm line-through",
            props.cancelled && "text-red-300 line-through",
            props.additional && "text-green-300"
          )}
        >
          {formatTime(scheduledTime)}
        </p>
        {isTooLate && diffMins > 0 && <p className={"text-md text-red-500"}>(+{diffMins})</p>}
        {isTooEarly && diffMins < 0 && <p className={"text-md text-green-500"}>({diffMins})</p>}
      </div>
      {time && (
        <>
          <div
            className={clsx(
              "m-auto text-lg",
              isTooLate && diffMins > 0
                ? "text-red-500"
                : !props.cancelled
                ? "text-green-500"
                : "text-red-300 line-through",
              props.timeType === "REAL" && "font-bold",
              props.timeType === "SCHEDULE" && "italic" 
            )}
          >
            {formatTime(time)}
          </div>
        </>
      )}
    </div>
  );
}
