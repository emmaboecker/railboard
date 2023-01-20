"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { formatTime } from "../../../utils/time";
import { StationBoardTrain } from "../../../requests/vendo/stationBoard";
import Popup from "../../ui/Popup";
import { TailSpin } from "react-loader-spinner";

export default function DetailsPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  train: StationBoardTrain;
}) {
  const router = useRouter();

  // const number = props.train.name.match(/\d+/);
  //
  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const date = new Date((props.train.departure ?? props.train.arrival!).time.scheduledTime);
  // const time = dayjs.tz(date, "Europe/Berlin");

  const scheduledPlatform = props.train.scheduledPlatform;
  const platform = props.train.realtimePlatform;

  const isDifferentPlatform =
    scheduledPlatform != null ? (platform != null ? scheduledPlatform !== platform : undefined) : undefined;

  const [detailsLoading, setDetailsLoading] = useState(false);

  return (
    <Popup
      onClose={() => undefined}
      open={props.open}
      setOpen={props.setOpen}
      title={props.train.name}
      className={"flex flex-col gap-3"}
    >
      <div className={"relative flex w-full flex-row justify-start py-3 align-middle"}>
        <div className={"w-full overflow-hidden"}>
          <table className="my-auto mr-0 max-w-full border-spacing-5">
            {props.train.arrival && (
              <tr>
                <td className={"text-left font-semibold text-zinc-500"}>Von: </td>
                <td className={"truncate pl-2 text-left"}>{props.train.arrival.origin}</td>
              </tr>
            )}
            {props.train.departure && (
              <tr>
                <td className={"text-left font-semibold text-zinc-500"}>Nach: </td>
                <td className={"truncate pl-2 text-left"}>{props.train.departure.destination}</td>
              </tr>
            )}
          </table>
        </div>
        {props.train.scheduledPlatform != null && (
          <div className={"right-0 flex pl-2 align-middle"}>
            <div className={"my-auto flex flex-row rounded-md border-2 border-zinc-700 bg-zinc-800"}>
              <div className={"flex flex-row p-1"}>
                <p className={"m-auto"}>Gl.</p>
                <div className={clsx("my-auto pl-1", isDifferentPlatform === true && "text-red-500 line-through")}>
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
      </div>
      <div>
        <div className={"mx-5 flex flex-col justify-center gap-3 xsm:flex-row xsm:gap-10"}>
          {props.train.arrival != null && (
            <div>
              <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Ankunft</h5>
              <TimeDisplay
                scheduledTime={props.train.arrival.time.scheduled}
                time={props.train.arrival.time.realtime}
              />
            </div>
          )}
          {props.train.departure && (
            <div>
              <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Abfahrt</h5>
              <TimeDisplay
                scheduledTime={props.train.departure.time.scheduled}
                time={props.train.departure.time.realtime}
              />
            </div>
          )}
        </div>
      </div>
      {props.train.notes.length > 0 && (
        <div className={"flex w-full flex-col"}>
          <h4 className={"mx-auto text-xl font-semibold"}>Meldungen</h4>
          <div className={"text-red-500"}>
            <ul className={"list-disc pl-4 text-start"}>
              {props.train.notes.map((notice) => (
                <li className={"mr-auto list-item"} key={notice}>
                  {notice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/*{(props.train.product === "ICE" ||*/}
      {/*  props.train.product === "IC_EC" ||*/}
      {/*  props.train.product === "RB") && (*/}
      {/*  <>*/}
      {/*    <h4 className={"text-xl font-semibold"}>Wagenreihung (Coming soon)</h4>*/}
      {/*    {number != null && (*/}
      {/*      <CoachSequence*/}
      {/*        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
      {/*        lineNummer={number[0]!}*/}
      {/*        time={time.format("YYYYMMDDHHmm")}*/}
      {/*        visible={true}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*)}*/}
      <div className={"flex w-full flex-row justify-end"}>
        <button
          onClick={() => {
            setDetailsLoading(true);
            router.push(`/journey/${encodeURIComponent(props.train.journeyId)}`);
          }}
          disabled={detailsLoading}
        >
          <div
            className={
              "flex flex-row gap-1 rounded-md bg-zinc-700/60 py-1 px-2 align-middle transition-all duration-100 hover:bg-zinc-700"
            }
          >
            {detailsLoading ? (
              <TailSpin
                width={20}
                height={20}
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <HiExternalLink size={20} className={"my-auto"} />
            )}
            <p>Details</p>
          </div>
        </button>
      </div>
    </Popup>
  );
}

function TimeDisplay(props: { scheduledTime: string; time?: string }): JSX.Element {
  const isTooLate = props.time ? new Date(props.scheduledTime).getTime() !== new Date(props.time).getTime() : undefined;

  const scheduledTime = new Date(props.scheduledTime.toString());
  const time = props.time != null ? new Date(props.time.toString()) : undefined;

  const diffSeconds = ((time?.getTime() ?? 0) - scheduledTime.getTime()) / 1000;
  const diffMins = Math.floor(diffSeconds / 60);

  return (
    <div className={clsx("m-auto flex w-full flex-col justify-center align-middle")}>
      <div className={clsx("m-auto flex h-full flex-row gap-1 align-middle")}>
        <p className={clsx("m-auto text-white", isTooLate != null && isTooLate && "line-through")}>
          {formatTime(scheduledTime)}
        </p>
        {isTooLate && <p className={"text-md my-auto text-red-500"}>(+{diffMins})</p>}
      </div>
      {time && (
        <>
          <div className={clsx("m-auto text-lg", isTooLate == null || isTooLate ? "text-red-500" : "text-green-500")}>
            {formatTime(time)}
          </div>
        </>
      )}
    </div>
  );
}
