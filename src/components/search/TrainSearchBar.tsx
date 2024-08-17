"use client";

import { Transition } from "@headlessui/react";
import { useClickOutside, useDebouncedValue } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { getApiBaseUrl } from "../../requests/get_base_url";
import { RisJourneySearchElement } from "../../requests/ris/journeySearch";

export type TrainSearchBarProps = {
  date: Date;
};

export default function TrainSearchBar(props: TrainSearchBarProps): JSX.Element {
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");
  const [debouncedCategory] = useDebouncedValue(category, 300);
  const [debouncedNumber] = useDebouncedValue(number, 300);

  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const router = useRouter();

  const date = dayjs(props.date).format("YYYY-MM-DD");

  const { data } = useSWR(
    `${getApiBaseUrl()}/ris/v1/journey_search/${debouncedCategory}/${encodeURIComponent(debouncedNumber)}?date=${date}`,
    (key) => fetch(key).then((res) => res.json() as Promise<RisJourneySearchElement[]>)
  );

  return (
    <div className="relative w-full">
      <div className="flex flex-row gap-5">
        <input
          className="w-[20%] rounded-md bg-zinc-800 p-2 text-white outline-none"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setCategory(e.currentTarget.value);
          }}
          onClick={() => {
            setOpen(true);
          }}
          value={category}
          placeholder={"Kategorie"}
        />

        <input
          className="w-full flex-grow rounded-md bg-zinc-800 p-2 text-white outline-none"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setNumber(e.currentTarget.value);
          }}
          onClick={() => {
            setOpen(true);
          }}
          value={number}
          placeholder={"Zugnummer"}
        />
      </div>
      <Transition
        show={open && category !== "" && category != null && number !== "" && number != null}
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
                        key={trip.journeyID}
                        trip={trip}
                        onClick={async () => {
                          await router.push(`/journey/${trip.journeyID}`);
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
  trip: RisJourneySearchElement;
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
                <div className="my-auto text-lg font-semibold">
                  {props.trip.transport.category + " " + (props.trip.transport.line ?? props.trip.transport.number)}
                </div>
              </div>
              <div className="my-auto">
                <div className={"flex flex-row gap-1 truncate font-sans text-zinc-400"}>
                  <p>Von:</p>
                  <p className={"truncate text-white"}>{props.trip.originSchedule.name} </p>
                </div>
                <div className={"flex flex-row gap-1 truncate font-sans text-zinc-400"}>
                  <p>Nach:</p>
                  <p className={"truncate text-white"}>{props.trip.destinationSchedule.name}</p>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
