"use client";

import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { TabSelection } from "../components/ui/TabSelection";
import { Search, Train } from "tabler-icons-react";
import StationBoardPanel from "./StationBoardPanel";
import TrainSearchPanel from "./TrainSearchPanel";
import RailboardInfo from "./RailboardInfo";

export default function HomePage() {
  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <Tab.Group>
      <Tab.Panels className="flex w-full justify-center py-3 text-white">
        <Tab.Panel key={"stationboard"}>
          <StationBoardPanel />
        </Tab.Panel>
        <Tab.Panel key={"trainsearch"}>
          <TrainSearchPanel />
        </Tab.Panel>
      </Tab.Panels>
      <div className={"absolute mb-5 w-full text-white"}>
        <RailboardInfo />
      </div>
      <div className="flex w-screen justify-center align-middle">
        <Tab.List
          className={clsx(
            "bottom-0 flex h-16 w-screen flex-row bg-zinc-800 md:w-[70vw] md:rounded-t-md xl:w-[50vw]",
            isKeyboardOpen ? "hidden" : "absolute"
          )}
        >
          <TabSelection key={"stationboard"} selection="Station Board" icon={<Train color="white" />} />
          <TabSelection key={"trainsearch"} selection="Zugsuche" icon={<Search color="white" />} />
        </Tab.List>
      </div>
    </Tab.Group>
  );
}
