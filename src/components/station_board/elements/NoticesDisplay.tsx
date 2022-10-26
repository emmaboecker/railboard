export type NoticesDisplayProps = {
  notices: string[];
};

export default function NoticesDisplay(
  props: NoticesDisplayProps
): JSX.Element {
  return (
    <div className={"flex flex-col text-sm text-red-500"}>
      {props.notices.map((notice) => (
        <p key={notice}>{notice}</p>
      ))}
    </div>
  );
}
