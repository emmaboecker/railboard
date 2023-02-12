export type StationsDisplayProps = {
  originName: string;
  destinationName: string;
};

export default function StationsDisplay(props: StationsDisplayProps): JSX.Element {
  return (
    <div className="flex max-w-full flex-col truncate text-sm">
      <div className={"flex truncate font-sans text-zinc-400"}>
        Von: <p className={"ml-2 truncate text-white"}>{props.originName}</p>
      </div>
      <div className={"flex truncate font-sans text-zinc-400"}>
        Nach:
        <p className={"ml-2 truncate text-white"}>{props.destinationName}</p>
      </div>
    </div>
  );
}
