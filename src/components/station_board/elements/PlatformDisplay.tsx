import clsx from "clsx";

export default function PlatformDisplay(props: { scheduledPlatform?: string; platform?: string }) {
  const scheduledPlatform = props.scheduledPlatform;
  const platform = props.platform;

  const isDifferentPlatform =
    scheduledPlatform != null ? (platform != null ? scheduledPlatform !== platform : undefined) : undefined;

  return (
    <>
      {scheduledPlatform != null && (
        <div className={"right-0 flex pl-2"}>
          <div className={"my-auto flex flex-row rounded-md border-2 border-zinc-700 bg-zinc-800"}>
            <div className={"flex flex-row whitespace-nowrap p-1"}>
              <p className={"m-auto"}>Gl.</p>
              <div className={clsx("my-auto w-fit pl-1", isDifferentPlatform === true && "text-red-500 line-through")}>
                {scheduledPlatform}
              </div>
              {isDifferentPlatform === true && (
                <>
                  <div className={"my-auto pl-1"}>{platform}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
