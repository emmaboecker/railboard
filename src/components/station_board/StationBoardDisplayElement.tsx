import NameAndPlatformDisplay from "./elements/NameAndPlatformDisplay";
import StationsDisplay from "./elements/StationsDisplay";
import TimeDisplay from "./elements/TimeDisplay";
import NoticesDisplay from "./elements/NoticesDisplay";
import { StationBoardTrain } from "../../data/station_board";

export type StationBoardDisplayElementProps = {
  train: StationBoardTrain;
};

export default function StationBoardDisplayElement(props: StationBoardDisplayElementProps): JSX.Element {
  return (
    <>
      <div className="flex h-full w-full flex-row ">
        {props.train.arrival?.time != null || props.train.departure?.time != null ? (
          <div className={"h-full w-full min-w-[100px] max-w-[120px]"}>
            <TimeDisplay arrivalTime={props.train.arrival?.time} departureTime={props.train.departure?.time} />
          </div>
        ) : null}

        <div className="flex w-full flex-col justify-start truncate pr-1 align-middle">
          <div className="my-auto w-full">
            <NameAndPlatformDisplay trainData={props.train} />
          </div>
          {props.train.notices.length > 0 && (
            <div className="my-auto ml-0 w-full">
              <NoticesDisplay notices={props.train.notices} />
            </div>
          )}
          <div className="relative my-auto">
            <StationsDisplay trainData={props.train} />
          </div>
        </div>
      </div>
    </>
  );
}
