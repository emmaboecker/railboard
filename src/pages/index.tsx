import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { MapPins, Train } from "tabler-icons-react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import StationBoardPanel from "../components/home/StationBoardPanel";
import TripSearchPanel from "../components/home/TripSearchPanel";
import { TabSelection } from "../components/ui/TabSelection";

export default function Home(): JSX.Element {
  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <Tab.Group>
      <Tab.Panels className="flex w-full justify-center py-3 text-white">
        <Tab.Panel key={"stationboard"}>
          <StationBoardPanel />
        </Tab.Panel>
        <Tab.Panel key={"tripsearch"}>
          <TripSearchPanel />
        </Tab.Panel>
      </Tab.Panels>

      <div className="flex w-screen justify-center align-middle">
        <Tab.List
          className={clsx(
            "bottom-0 flex h-16 w-screen flex-row bg-zinc-800 md:w-[70vw] md:rounded-t-md xl:w-[50vw]",
            isKeyboardOpen ? "hidden" : "absolute"
          )}
        >
          <TabSelection
            key={"stationboard"}
            selection="Station Board"
            icon={<Train color="white" />}
          />
          <TabSelection
            key={"tripsearch"}
            selection="Trip Search"
            icon={<MapPins color="white" />}
          />
        </Tab.List>
      </div>
    </Tab.Group>
  );
}
