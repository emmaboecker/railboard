"use client";

import { useLocalStorage } from "@mantine/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import TransportTypeFilterButtonPopup, {
  TransportType,
  transportTypes,
} from "../../../components/station_board/filter/TransportTypeFilter";
import Button from "../../../components/ui/button/Button";
import GoBackButton from "../../../components/ui/button/GoBackButton";
import Popup from "../../../components/ui/Popup";
import { StationInfo } from "../../../data/station_info";
import ReloadButton from "./ReloadButton";
import StationShareButton from "./StationShareButton";

export default function StationBoardTopBar(props: {
  data: StationInfo;
  station: number;
  datetime?: number;
  children?: React.ReactNode;
}) {
  const [currentTransportTypes, setTransportTypes] = useLocalStorage<TransportType[]>({
    key: "transport-types",
    defaultValue: transportTypes,
  });

  const { data, datetime, station, children } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={"relative h-[100svh] text-white"}>
        <div className={"absolute flex h-14 w-full border-b-4 border-b-zinc-700 bg-zinc-800 align-middle"}>
          <div className={"absolute left-0 ml-3 flex h-full"}>
            <GoBackButton className={"my-[9px]"} />
          </div>
          <div className={"my-auto ml-[4.25rem] truncate text-lg font-semibold"}>
            <h1>{data.name}</h1>
          </div>
          <div className={"absolute right-0 flex h-full gap-1 px-2"}>
            <ReloadButton stationId={station} className={"my-auto text-sm"} />
            <Button
              onClick={() => {
                setOpen(!open);
                console.log(open);
              }}
              className={"my-auto text-sm"}
            >
              <div className="flex flex-row gap-2">
                <GiHamburgerMenu size={20} />
                <p className="hidden md:block">Optionen</p>
              </div>
            </Button>
          </div>
        </div>
        <Popup
          title={
            <div className="flex w-full">
              <p className="flex-grow justify-start text-start">Optionen</p>
              <StationShareButton
                className="float-right my-auto flex flex-row items-center gap-2 bg-transparent text-sm text-white hover:bg-zinc-900/100"
                station={station}
                datetime={datetime}
                size={14}
              >
                <p className="sr-only xl:not-sr-only">Station teilen</p>
              </StationShareButton>
            </div>
          }
          open={open}
          setOpen={setOpen}
        >
          <PopupContent setTransportTypes={setTransportTypes} currentTransportTypes={currentTransportTypes} />
        </Popup>
        <div className="h-full pt-14">{children}</div>
      </div>
    </>
  );
}

function PopupContent(props: {
  setTransportTypes: Dispatch<SetStateAction<TransportType[]>>;
  currentTransportTypes: TransportType[];
}) {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1" style={{ columnGap: "1rem", rowGap: "1rem" }}>
        <TransportTypeFilterButtonPopup
          transportTypes={props.currentTransportTypes}
          setTransportTypes={props.setTransportTypes}
        >
          <div className="flex flex-row items-center gap-2">
            <FaFilter />
            <p className="truncate">Filter</p>
          </div>
        </TransportTypeFilterButtonPopup>
      </div>
    </>
  );
}
