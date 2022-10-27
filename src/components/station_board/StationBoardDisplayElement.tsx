import NameAndPlatformDisplay from "./elements/NameAndPlatformDisplay";
import StationsDisplay from "./elements/StationsDisplay";
import TimeDisplay from "./elements/TimeDisplay";
import NoticesDisplay from "./elements/NoticesDisplay";
import { StationBoardTrain } from "../../data/station_board";

export type StationBoardDisplayElementProps = {
  train: StationBoardTrain;
};

export default function StationBoardDisplayElement(
  props: StationBoardDisplayElementProps
): JSX.Element {
  return (
    <div className="flex h-full w-full flex-row ">
      <div className={"h-full w-[20%] min-w-[100px] max-w-[150px]"}>
        <TimeDisplay
          arrivalTime={props.train.arrival?.time}
          departureTime={props.train.departure?.time}
        />
      </div>
      <div className="flex w-full flex-col truncate pr-4 align-middle">
        <div className="my-auto w-full">
          <NameAndPlatformDisplay trainData={props.train} />
        </div>
        {props.train.notices.length > 0 && (
          <div className="my-auto">
            <NoticesDisplay notices={props.train.notices} />
          </div>
        )}
        <div className="my-auto">
          <StationsDisplay trainData={props.train} />
        </div>
      </div>
    </div>
  );
}
