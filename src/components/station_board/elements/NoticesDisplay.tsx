import { BiErrorAlt } from "react-icons/bi";
import { StationBoardMessage } from "../../../requests/custom/stationBoard";

export type NoticesDisplayProps = {
  messages: StationBoardMessage[];
};

export default function NoticesDisplay(props: NoticesDisplayProps): JSX.Element {
  const uniqueMessages = props.messages.filter((element, index) => {
    return (
      (element.messageStatus === "CauseOfDelay" || element.messageStatus === "QualityChange") &&
      props.messages.findIndex((e) => e.id === element.id || e.matchedText === element.matchedText) === index
    );
  });

  return (
    <>
      {uniqueMessages.length > 0 && (
        <div className={"text-md ml-0 mr-auto flex flex-row justify-start gap-2 truncate align-middle text-red-400"}>
          <BiErrorAlt className={"my-auto"} /> Es sind Meldungen verfügbar
        </div>
      )}
    </>
  );
}
