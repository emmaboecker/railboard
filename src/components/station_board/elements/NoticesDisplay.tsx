export type NoticesDisplayProps = {
  notices: string[];
};

export default function NoticesDisplay(
  props: NoticesDisplayProps
): JSX.Element {
  return (
    <div
      className={
        "text-md ml-0 mr-auto flex flex-col justify-start text-red-500"
      }
    >
      {props.notices.map((notice) => (
        <p className={"mr-auto"} key={notice}>
          - {notice}
        </p>
      ))}
    </div>
  );
}
