import clsx from "clsx";
import { StationBoardItem } from "../../../requests/custom/stationBoard";
import PlatformDisplay from "./PlatformDisplay";

export type NameDisplayProps = {
  trainData: StationBoardItem;
};

export default function NameAndPlatformDisplay(props: NameDisplayProps): JSX.Element {
  const scheduledPlatform = props.trainData.platformScheduled;
  const platform = props.trainData.platformRealtime;

  return (
    <div className={"relative flex h-full w-full flex-row align-middle"}>
      <div className={clsx("my-auto text-lg font-semibold", props.trainData.cancelled && "italic line-through")}>
        {props.trainData.category + " " + props.trainData.lineIndicator}
      </div>
      <div className={"absolute right-0 flex flex-row"}>
        <PlatformDisplay scheduledPlatform={scheduledPlatform} platform={platform} />
      </div>
    </div>
  );
}
