"use client";

import { Fragment, useState } from "react";
import { useClickOutside, useDebouncedValue } from "@mantine/hooks";
import useSWR from "swr";
import { Transition } from "@headlessui/react";
import journeyMatch, { Trip } from "../../requests/hafas/journey_match";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export type TrainSearchBarProps = {
  date: Date;
};

export default function TrainSearchBar(props: TrainSearchBarProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const router = useRouter();

  const { data } = useSWR(debouncedSearch, (key) => journeyMatch(key, props.date));

  return (
    <div className="relative w-full">
      <input
        className=" w-full rounded-md bg-zinc-800 p-2 text-white outline-none"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
        onClick={() => {
          setOpen(true);
        }}
        value={search}
        placeholder={"Suche nach einem Zuglauf"}
      />
      <Transition
        show={open && search !== ""}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className={"absolute z-30 m-auto mt-2 flex w-full rounded-md bg-zinc-800 p-2 text-white"} ref={ref}>
          <>
            {!data ? (
              <div className="flex h-32 w-full justify-center align-middle">
                <p>Lädt...</p>
              </div>
            ) : (
              <div className="flex w-full flex-col">
                {data.length === 0 ? (
                  <>Kein Ergebnis gefunden</>
                ) : (
                  <div className={"max-h-96 overflow-auto"}>
                    {data.map((trip) => (
                      <TrainResultDisplay
                        key={trip.jid}
                        trip={trip}
                        onClick={async () => {
                          await router.push(`/journey/${trip.jid}`);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </Transition>
    </div>
  );
}

type TrainResultDisplayProps = {
  trip: Trip;
  onClick: () => void;
};

function TrainResultDisplay(props: TrainResultDisplayProps) {
  return (
    <>
      <div className={"flex rounded-md p-2 hover:bg-zinc-700"}>
        <button
          className="flex w-full text-start align-middle text-base"
          onClick={() => {
            props.onClick();
          }}
        >
          <div className="flex h-full w-full flex-row">
            <div className="flex w-full flex-col justify-start truncate pr-1 align-middle">
              <div className="my-auto w-full">
                <div className="my-auto text-lg font-semibold">{props.trip.train.name}</div>
              </div>
              <div className="my-auto">
                <div className={"flex flex-row gap-1 truncate font-sans text-zinc-400"}>
                  <p>Von:</p>
                  <p className={"truncate text-white"}>{props.trip.firstStop.station.title} </p>
                  <p>um</p>
                  <p className={"text-white"}>
                    {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                    {dayjs(new Date(props.trip.firstStop.departure!.scheduledTime)).format("HH:mm")}
                  </p>
                </div>
                <div className={"flex flex-row gap-1 truncate font-sans text-zinc-400"}>
                  <p>Nach:</p>
                  <p className={"truncate text-white"}>{props.trip.lastStop.station.title}</p>
                  <p>um</p>
                  <p className={"text-white"}>
                    {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                    {dayjs(new Date(props.trip.lastStop.arrival!.scheduledTime!)).format("HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
