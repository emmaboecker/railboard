"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle } from "../components/ui/PageTitle";
import StationSearchBar from "../components/search/StationSearchBar";
import Button from "../components/ui/button/Button";

export default function StationBoardPanel() {
  const [selectedStationId, setSelectedStationId] = useState<string | undefined>(undefined);

  const [date, setDate] = useState(new Date());

  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false);

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
          <div className={"w-5"} />
          <Button
            className={"w-32"}
            onClick={() => {
              setDate(new Date());
            }}
          >
            jetzt
          </Button>
        </div>
        <div className="h-16" />
        <Button
          className={"p-3"}
          onClick={() => {
            setRedirecting(true);
            router.push(`/station/${selectedStationId}/${date.getTime()}`);
          }}
          disabled={!selectedStationId || redirecting}
        >
          {selectedStationId ? (redirecting ? "Lade Station Board" : "Station Board anzeigen") : "Wähle eine Station aus"}
        </Button>
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
