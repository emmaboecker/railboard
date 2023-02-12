import { InternalTimeDisplay } from "../../../components/station_board/elements/TimeDisplay";

export type TimeDisplayProps = {
  arrivalTime?: {
    scheduled?: string;
    realtime?: string;
  };
  departureTime?: {
    scheduled?: string;
    realtime?: string;
  };
};

export default function StopTimeDisplay(props: TimeDisplayProps): JSX.Element {
  const scheduledArrival = props.arrivalTime?.scheduled;
  const actualArrival = props.arrivalTime?.realtime;

  const scheduledDepart = props.departureTime?.scheduled;
  const actualDepart = props.departureTime?.realtime;

  return (
    <div className={"flex h-full w-full flex-row justify-center align-middle"}>
      {scheduledArrival && <InternalTimeDisplay scheduledTime={scheduledArrival} time={actualArrival} />}
      {scheduledDepart && <InternalTimeDisplay scheduledTime={scheduledDepart} time={actualDepart} />}
    </div>
  );
}
