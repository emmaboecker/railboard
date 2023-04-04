import { PageTitle } from "../components/ui/PageTitle";
import { useState } from "react";
import TrainSearchBar from "../components/search/TrainSearchBar";
import { formatDate } from "./StationBoardPanel";
import Button from "../components/ui/button/Button";

export default function TrainSearchPanel() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className={"row-auto flex w-full flex-col justify-center text-center align-middle"}>
        <div className={"m-auto"}>
          <PageTitle title="Zugsuche" />
        </div>
        <div className="h-10" />
        <div className="mt-8 flex w-screen flex-col justify-center px-6 align-middle md:w-[70vw] xl:w-[50vw]">
          <div className={"flex flex-col gap-5"}>
            <div className={"flex flex-row gap-5"}>
              <input
                type={"date"}
                onChange={(event) => {
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
                heute
              </Button>
            </div>
            <TrainSearchBar date={date} />
          </div>
        </div>
      </div>
    </>
  );
}
