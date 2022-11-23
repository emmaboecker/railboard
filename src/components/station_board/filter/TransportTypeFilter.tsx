"use client";

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import Button from "../../ui/button/Button";
import { FaFilter } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import { BiSelectMultiple } from "react-icons/bi";
import { FiXSquare } from "react-icons/fi";

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
};

export default function TransportTypeFilter(props: TransportTypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={"h-full px-3"}>
        <FaFilter />
      </Button>
      <Transition appear show={isOpen} as={"div"}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={"div"}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={
                    "flex w-[90vw] flex-col rounded-lg bg-zinc-800 p-5 text-violet-400 md:w-[70vw] xl:w-[50vw]"
                  }
                >
                  <Dialog.Title
                    className={
                      "flex w-full flex-row justify-between text-xl font-bold"
                    }
                  >
                    <p>Verkehrsmittel</p>
                    <button
                      className={
                        "rounded-md p-1 transition-all duration-200 hover:bg-zinc-900"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <IoCloseOutline color={"white"} size={24} />
                    </button>
                  </Dialog.Title>
                  <Dialog.Description
                    as={"div"}
                    className={
                      "flex h-fit w-full flex-col justify-start gap-4 pt-5"
                    }
                  >
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
                    <div
                      className={
                        "flex w-full flex-col gap-2 sm:flex-row sm:gap-1 md:gap-2"
                      }
                    >
                      <Button
                        className={"w-full text-white"}
                        onClick={() => props.setTransportTypes(transportTypes)}
                      >
                        <div
                          className={
                            "m-auto flex flex-row justify-center gap-2"
                          }
                        >
                          <BiSelectMultiple size={22} className={"my-auto"} />
                          <p className={"my-auto"}>Alle Auswählen</p>
                        </div>
                      </Button>
                      <Button
                        className={"w-full text-white"}
                        onClick={() => props.setTransportTypes([])}
                      >
                        <div
                          className={
                            "m-auto flex flex-row justify-center gap-2"
                          }
                        >
                          <FiXSquare size={22} className={"my-auto"} />
                          <p className={"my-auto"}>Alle Abwählen</p>
                        </div>
                      </Button>
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function TransportTypeToggle(
  props: TransportTypeFilterProps & { transportType: TransportType }
) {
  const enabled = props.transportTypes.includes(props.transportType);

  return (
    <div className={"flex flex-row gap-2"}>
      <Switch
        checked={props.transportTypes.includes(props.transportType)}
        onChange={(value) => {
          if (value) {
            props.setTransportTypes((prevState) =>
              prevState.concat(props.transportType)
            );
          } else {
            props.setTransportTypes((prevState) =>
              prevState.filter((filter) => filter !== props.transportType)
            );
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
      <p className={"truncate font-semibold text-white/70"}>
        {getReadableName(props.transportType)}
      </p>
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
      readableName = "Schnellzüge";
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
