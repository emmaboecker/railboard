"use client";

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Switch } from "@headlessui/react";
import Button from "../../ui/button/Button";
import { FaFilter } from "react-icons/fa";
import clsx from "clsx";
import { BiSelectMultiple } from "react-icons/bi";
import { FiXSquare } from "react-icons/fi";
import Popup from "../../ui/Popup";

export enum TransportType {
  HighspeedTrains = "HOCHGESCHWINDIGKEITSZUEGE",
  ICAndECTrains = "INTERCITYUNDEUROCITYZUEGE",
  InterregionalAndFastTrains = "INTERREGIOUNDSCHNELLZUEGE",
  RegionalAndOtherTrains = "NAHVERKEHRSONSTIGEZUEGE",
  SuburbanTrains = "SBAHNEN",
  Busses = "BUSSE",
  Boats = "SCHIFFE",
  Subway = "UBAHN",
  Tram = "STRASSENBAHN",
  CallRequiringTransportTypes = "ANRUFPFLICHTIGEVERKEHRE",
}

export const transportTypes = [
  TransportType.HighspeedTrains,
  TransportType.ICAndECTrains,
  TransportType.InterregionalAndFastTrains,
  TransportType.RegionalAndOtherTrains,
  TransportType.SuburbanTrains,
  TransportType.Subway,
  TransportType.Tram,
  TransportType.Busses,
  TransportType.Boats,
  TransportType.CallRequiringTransportTypes,
];

export type TransportTypeFilterProps = {
  transportTypes: TransportType[];
  setTransportTypes: Dispatch<SetStateAction<TransportType[]>>;
  children?: React.ReactNode;
};

export default function TransportTypeFilterButtonPopup(props: TransportTypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={"h-full px-3"}>
        {props.children ?? <FaFilter />}
      </Button>
      <Popup
        onClose={() => setIsOpen(false)}
        open={isOpen}
        setOpen={setIsOpen}
        title={"Verkehrsmittel"}
        className={"flex flex-col gap-4"}
      >
        <TransportTypeFilters {...props} />
      </Popup>
    </>
  );
}

export function TransportTypeFilters(props: {
  transportTypes: TransportType[];
  setTransportTypes: Dispatch<SetStateAction<TransportType[]>>;
}) {
  return (
    <>
      {transportTypes.map((type) => {
        return (
          <Fragment key={type}>
            <TransportTypeToggle
              transportTypes={props.transportTypes}
              setTransportTypes={props.setTransportTypes}
              transportType={type}
            />
          </Fragment>
        );
      })}
      <div className={"flex w-full flex-col gap-2 sm:flex-row sm:gap-1 md:gap-2"}>
        <Button className={"w-full text-white"} onClick={() => props.setTransportTypes(transportTypes)}>
          <div className={"m-auto flex flex-row justify-center gap-2"}>
            <BiSelectMultiple size={22} className={"my-auto"} />
            <p className={"my-auto"}>Alle Auswählen</p>
          </div>
        </Button>
        <Button className={"w-full text-white"} onClick={() => props.setTransportTypes([])}>
          <div className={"m-auto flex flex-row justify-center gap-2"}>
            <FiXSquare size={22} className={"my-auto"} />
            <p className={"my-auto"}>Alle Abwählen</p>
          </div>
        </Button>
      </div>
    </>
  );
}

function TransportTypeToggle(props: TransportTypeFilterProps & { transportType: TransportType }) {
  const enabled = props.transportTypes.includes(props.transportType);

  return (
    <div className={"flex flex-row gap-2"}>
      <Switch
        checked={props.transportTypes.includes(props.transportType)}
        onChange={(value) => {
          if (value) {
            props.setTransportTypes((prevState) => prevState.concat(props.transportType));
          } else {
            props.setTransportTypes((prevState) => prevState.filter((filter) => filter !== props.transportType));
          }
        }}
        className={clsx(
          enabled ? "bg-violet-500" : "bg-zinc-900",
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          "duration 200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        )}
      >
        <span className="sr-only">{getReadableName(props.transportType)}</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <p className={"truncate font-semibold text-white/70"}>{getReadableName(props.transportType)}</p>
    </div>
  );
}

export function getReadableName(transportType: TransportType): string {
  let readableName: string;
  switch (transportType) {
    case TransportType.HighspeedTrains:
      readableName = "Hochgeschwindigkeitszüge";
      break;
    case TransportType.ICAndECTrains:
      readableName = "IC- & EC-Züge";
      break;
    case TransportType.InterregionalAndFastTrains:
      readableName = "Interregionalzüge";
      break;
    case TransportType.RegionalAndOtherTrains:
      readableName = "Nahverkehr & Sonstige Züge";
      break;
    case TransportType.SuburbanTrains:
      readableName = "S-Bahn";
      break;
    case TransportType.Tram:
      readableName = "Straßenbahn";
      break;
    case TransportType.Subway:
      readableName = "U-Bahn";
      break;
    case TransportType.Busses:
      readableName = "Busse";
      break;
    case TransportType.Boats:
      readableName = "Schiffe";
      break;
    case TransportType.CallRequiringTransportTypes:
      readableName = "Anrufpflichtige Verkehrsmittel";
      break;
  }
  return readableName;
}
