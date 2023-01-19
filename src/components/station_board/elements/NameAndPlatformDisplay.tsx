import clsx from "clsx";
import { StationBoardTrain } from "../../../requests/vendo/stationBoard";

export type NameDisplayProps = {
  trainData: StationBoardTrain;
};

export default function NameAndPlatformDisplay(props: NameDisplayProps): JSX.Element {
  const scheduledPlatform = props.trainData.scheduledPlatform;
  const platform = props.trainData.realtimePlatform;

  const isDifferentPlatform =
    scheduledPlatform != null ? (platform != null ? scheduledPlatform !== platform : undefined) : undefined;

  return (
    <div className={"relative flex h-full w-full flex-row align-middle"}>
      <div
        className={clsx(
          "my-auto text-lg font-semibold",
          props.trainData.notes.includes("Halt entfällt") && "italic line-through"
        )}
      >
        {props.trainData.name}
      </div>
      {props.trainData.scheduledPlatform != null && (
        <div className={"absolute right-0 flex flex-row rounded-md bg-zinc-700"}>
          <div className={"flex flex-row p-1"}>
            <p className={"m-auto"}>Gl.</p>
            <div className={clsx("my-auto pl-1", isDifferentPlatform === true && "text-red-500 line-through")}>
              {props.trainData.scheduledPlatform}
            </div>
            {isDifferentPlatform === true && (
              <>
                <div className={"my-auto pl-1"}>{props.trainData.realtimePlatform}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
