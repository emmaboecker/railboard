import NameAndPlatformDisplay from "./elements/NameAndPlatformDisplay";
import StationsDisplay from "./elements/StationsDisplay";
import TimeDisplay from "./elements/TimeDisplay";
import NoticesDisplay from "./elements/NoticesDisplay";
import { StationBoardItem } from "../../requests/custom/stationBoard";

export type StationBoardDisplayElementProps = {
  train: StationBoardItem;
};

export default function StationBoardDisplayElement(props: StationBoardDisplayElementProps): JSX.Element {
  const messages = props.train.additionalInfo?.messages ?? [];

  return (
    <>
      <div className="flex h-full w-full flex-row ">
        {props.train.arrival != null || props.train.departure != null ? (
          <div className={"h-full w-full min-w-[100px] max-w-[120px]"}>
            <TimeDisplay
              arrivalSchedule={props.train.arrival?.timeScheduled}
              arrivalRealtime={props.train.arrival?.timeRealtime}
              departureSchedule={props.train.departure?.timeScheduled}
              departureRealtime={props.train.departure?.timeRealtime}
            />
          </div>
        ) : null}

        <div className="flex w-full flex-col justify-start truncate pr-1 align-middle">
          <div className="my-auto w-full">
            <NameAndPlatformDisplay trainData={props.train} />
          </div>
          {messages.length > 0 && (
            <div className="my-auto ml-0 w-full">
              <NoticesDisplay messages={messages} />
            </div>
          )}
          <div className="relative my-auto">
            <StationsDisplay originName={props.train.originName} destinationName={props.train.destinationName} />
          </div>
        </div>
      </div>
    </>
  );
}
