import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export type TimeDisplayProps = {
  arrivalTime?: {
    scheduled?: string,
    realtime?: string
  }
  departureTime?: {
    scheduled?: string,
    realtime?: string
  }
};

export default function StopTimeDisplay(props: TimeDisplayProps): JSX.Element {
  const scheduledArrival = props.arrivalTime?.scheduled;
  const actualArrival = props.arrivalTime?.realtime;

  const scheduledDepart = props.departureTime?.scheduled;
  const actualDepart = props.departureTime?.realtime;

  return (
    <div className={"flex h-full w-full flex-row justify-center align-middle"}>
      {scheduledArrival && (
        <InternalStopTimeDisplay
          scheduledTime={scheduledArrival}
          time={actualArrival}
        />
      )}
      {scheduledDepart && (
        <InternalStopTimeDisplay
          scheduledTime={scheduledDepart}
          time={actualDepart}
        />
      )}
    </div>
  );
}

function InternalStopTimeDisplay(props: {
  scheduledTime: string;
  time?: string;
}): JSX.Element {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const isTooLate = props.time
    ? new Date(props.scheduledTime).getTime() !== new Date(props.time).getTime()
    : undefined;

  const scheduledTime = dayjs.tz(new Date(props.scheduledTime.toString()), "Europe/Berlin").tz("Europe/Berlin");
  const time = props.time != null ? dayjs.tz(new Date(props.time.toString()), "Europe/Berlin").tz("Europe/Berlin") : undefined;

  const diffSeconds = ((time?.unix() ?? 0) - scheduledTime.unix());
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
          {scheduledTime.format("HH:mm")}
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
            {scheduledTime.format("HH:mm")}
          </div>
        </>
      )}
    </div>
  );
}
