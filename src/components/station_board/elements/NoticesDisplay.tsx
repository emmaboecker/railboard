import { BiErrorAlt } from "react-icons/bi";

export type NoticesDisplayProps = {
  notices: string[];
};

export default function NoticesDisplay(props: NoticesDisplayProps): JSX.Element {
  return (
    <>
      {props.notices.length > 0 && (
        <div className={"text-md ml-0 mr-auto flex flex-row justify-start gap-2 truncate align-middle text-red-500"}>
          <BiErrorAlt className={"my-auto"} /> Es sind Meldungen verfügbar
        </div>
      )}
    </>
  );
}
