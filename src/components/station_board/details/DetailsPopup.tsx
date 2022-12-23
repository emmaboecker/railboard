"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FullStationBoardTrain } from "../../../data/station_board";
import { HiExternalLink } from "react-icons/hi";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { formatTime } from "../../../utils/time";

export default function DetailsPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  train: FullStationBoardTrain;
}) {
  const router = useRouter();

  const number = props.train.name.match(/\d+/);

  return (
    <Transition appear show={props.open} as={"div"}>
      <Dialog
        as="div"
        className="relative z-10"
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onClose={() => {}}
      >
        <Transition.Child
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={"flex w-[90vw] flex-col rounded-lg bg-zinc-800 p-5 text-violet-400 md:w-[70vw] xl:w-[50vw]"}
              >
                <Dialog.Title className={"flex w-full flex-row justify-between text-xl font-bold"}>
                  <p>{props.train.name}</p>
                  <button
                    className={"rounded-md p-1 transition-all duration-200 hover:bg-zinc-900"}
                    onClick={() => props.setOpen(false)}
                  >
                    <IoCloseOutline color={"white"} size={24} />
                  </button>
                </Dialog.Title>
                <Dialog.Description
                  as={"div"}
                  className={"relative flex h-fit w-full flex-col justify-start gap-4 pt-5 text-white"}
                >
                  <div className={"flex flex-col gap-0 truncate"}>
                    {props.train.arrival && (
                      <div className={"flex w-full flex-row gap-1"}>
                        <h4 className={"font-semibold text-zinc-500"}>Von: </h4>
                        <p className={"truncate"}>{props.train.arrival.origin}</p>
                      </div>
                    )}
                    {props.train.departure && (
                      <div className={"flex w-full flex-row gap-1"}>
                        <h4 className={"font-semibold text-zinc-500"}>Nach: </h4>
                        <p className={"truncate"}>{props.train.departure.destination}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={"mx-5 flex flex-row justify-center gap-10"}>
                      {props.train.arrival && (
                        <div>
                          <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Ankunft</h5>
                          <TimeDisplay
                            scheduledTime={props.train.arrival.time.scheduledTime}
                            time={props.train.arrival.time.time}
                          />
                        </div>
                      )}
                      {props.train.departure && (
                        <div>
                          <h5 className={"mb-2 text-xl font-semibold text-zinc-400"}>Abfahrt</h5>
                          <TimeDisplay
                            scheduledTime={props.train.departure.time.scheduledTime}
                            time={props.train.departure.time.time}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {props.train.notices.length > 0 && (
                    <div>
                      <h4 className={"text-xl font-semibold"}>Nachrichten</h4>
                      <div className={"flex flex-col text-red-500"}>
                        {props.train.notices.map((notice) => (
                          <p key={notice}>{notice}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {(props.train.product === "ICE" ||
                    props.train.product === "IC_EC" ||
                    props.train.product === "RB") && (
                    <>
                      <h4 className={"text-xl font-semibold"}>Wagenreihung (Coming soon)</h4>
                      {number != null && <>{number[0]}</>}
                    </>
                  )}
                  <div className={"flex w-full flex-row justify-end"}>
                    <button
                      onClick={() => {
                        router.push(`/journey/${encodeURIComponent(props.train.journeyId)}`);
                      }}
                    >
                      <div
                        className={
                          "flex flex-row gap-1 rounded-md bg-zinc-700/60 py-1 px-2 align-middle transition-all duration-100 hover:bg-zinc-700"
                        }
                      >
                        <HiExternalLink size={20} className={"my-auto"} />
                        <p>Details</p>
                      </div>
                    </button>
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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
