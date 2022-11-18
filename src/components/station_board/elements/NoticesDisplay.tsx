export type NoticesDisplayProps = {
  notices: string[];
};

export default function NoticesDisplay(
  props: NoticesDisplayProps
): JSX.Element {
  return (
    <div className={"flex flex-col text-md text-red-500 justify-start ml-0 mr-auto"}>
      {props.notices.map((notice) => (
        <p className={"mr-auto"} key={notice}>- {notice}</p>
      ))}
    </div>
  );
}
