import { InternalTimeDisplay } from "../../../components/station_board/elements/TimeDisplay";

export type TimeDisplayProps = {
  arrivalTime?: {
    scheduled?: string;
    realtime?: string;
    cancelled?: boolean;
    additional?: boolean;
  };
  departureTime?: {
    scheduled?: string;
    realtime?: string;
    cancelled?: boolean;
    additional?: boolean;
  };
};

export default function StopTimeDisplay(props: TimeDisplayProps): JSX.Element {
  const scheduledArrival = props.arrivalTime?.scheduled;
  const actualArrival = props.arrivalTime?.realtime;

  const scheduledDepart = props.departureTime?.scheduled;
  const actualDepart = props.departureTime?.realtime;

  return (
    <div className={"flex h-full w-full flex-row justify-center align-middle"}>
      <div className={"m-auto flex h-full w-full items-center"}>
        {scheduledArrival && (
          <InternalTimeDisplay
            scheduledTime={scheduledArrival}
            time={actualArrival}
            cancelled={props.arrivalTime?.cancelled}
            additional={props.arrivalTime?.additional}
          />
        )}
      </div>
      <div className={"m-auto flex h-full w-full items-center"}>
        {scheduledDepart && (
          <InternalTimeDisplay
            scheduledTime={scheduledDepart}
            time={actualDepart}
            cancelled={props.departureTime?.cancelled}
            additional={props.departureTime?.additional}
          />
        )}
      </div>
    </div>
  );
}
