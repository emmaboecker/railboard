import { useEffect, useState } from "react";
import StationSearchBar from "../search/StationSearchBar";
import { PageTitle } from "../ui/PageTitle";
import clsx from "clsx";
import Link from "next/link";

export default function StationBoardPanel() {
  const [selectedStationId, setSelectedStationId] = useState<
    string | undefined
  >(undefined);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <>
      <div className="flex w-full flex-col justify-center text-center align-middle">
        <PageTitle title="Station Board" />
      </div>
      <div className="mt-8 flex w-screen flex-col justify-center px-6 align-middle md:w-[70vw] xl:w-[50vw]">
        <StationSearchBar setSelectedStationId={setSelectedStationId} />
        <div className="h-5" />
        <div className="flex w-full flex-grow flex-row ">
          <input
            type={"datetime-local"}
            onChange={(event) => {
              console.log(event.target.value);
              setDate(new Date(event.target.value));
            }}
            value={formatDate(date)}
            className="w-full rounded-md bg-zinc-800 p-2 text-white outline-none"
          />
        </div>
        <div className="h-16" />
        <Link href={`/station/${selectedStationId}/${date.getTime()}`}>
          <button
            className={clsx(
              "rounded-md p-2.5",
              selectedStationId
                ? "bg-violet-600/60 text-white"
                : "bg-zinc-700/80 text-zinc-400"
            )}
            disabled={!selectedStationId}
          >
            {selectedStationId ? "View Station Board" : "Select a Station"}
          </button>
        </Link>
      </div>
    </>
  );
}

function formatDate(date: Date): string {
  let formattedDate = "";
  formattedDate = formattedDate.concat(date.getFullYear().toString(), "-");
  formattedDate = formattedDate.concat(
    (date.getMonth() + 1).toString().padStart(2, "0"),
    "-"
  );
  formattedDate = formattedDate.concat(
    date.getDate().toString().padStart(2, "0"),
    "T"
  );
  formattedDate = formattedDate.concat(
    date.getHours().toString().padStart(2, "0"),
    ":"
  );
  formattedDate = formattedDate.concat(
    date.getMinutes().toString().padStart(2, "0")
  );
  return formattedDate;
}
