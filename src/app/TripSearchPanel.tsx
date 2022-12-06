import { PageTitle } from "../components/ui/PageTitle";
import BasicSearch from "../components/search/BasicSearch";
import journeyMatch, { Trip } from "../requests/hafas/journey_match";
import { useRouter } from "next/navigation";
import StationBoardDisplayElement from "../components/station_board/StationBoardDisplayElement";
import { StationBoardTrain } from "../data/station_board";
import Button from "../components/ui/button/Button";
import { useState } from "react";
import { formatDate } from "./StationBoardPanel";

type TripResultDisplayProps = {
  trip: Trip;
  onClick: () => void;
};

function TrainResultDisplay(props: TripResultDisplayProps) {
  const train: StationBoardTrain = {
    journeyId: props.trip.id,
    name: props.trip.line.name ?? "<unknown line>",
    arrival: {
      origin: props.trip.origin.name,
    },
    departure: {
      destination: props.trip.destination.name,
    },
    notices: [],
  };
  return (
    <>
      <div className={"flex rounded-md p-2 hover:bg-zinc-700"}>
        <button
          className="flex w-full text-start align-middle text-base"
          onClick={() => {
            props.onClick();
          }}
        >
          <StationBoardDisplayElement train={train} />
        </button>
      </div>
    </>
  );
}

export default function TrainSearchPanel() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={"row-auto flex w-full flex-col justify-center text-center align-middle"}>
        <div className={"m-auto"}>
          <PageTitle title="Trip Search" />
        </div>
        <div className="h-10" />
        <div className="mt-8 flex w-screen flex-col justify-center px-6 align-middle md:w-[70vw] xl:w-[50vw]">
          <div className={"flex flex-col gap-5"}>
            <div className={"flex flex-row gap-5"}>
              <input
                type={"date"}
                onChange={(event) => {
                  console.log(event.target.value);
                  setDate(new Date(event.target.value));
                }}
                value={formatDate(date, false)}
                className="w-full rounded-md bg-zinc-800 p-2 text-white outline-none"
              />
              <Button
                className={"w-32"}
                onClick={() => {
                  setDate(new Date());
                }}
              >
                jetzt
              </Button>
            </div>
            <BasicSearch
              placeholder={"Suche einen Zuglauf"}
              searchState={[search, setSearch]}
              open={[open, setOpen]}
              data={(input: string) => journeyMatch(input, date)}
              renderer={(trip) => (
                <TrainResultDisplay
                  key={trip.id}
                  trip={trip}
                  onClick={async () => {
                    await router.push(`/journey/${encodeURIComponent(trip.id)}`);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
