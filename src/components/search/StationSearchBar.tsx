import { Dialog, Transition } from "@headlessui/react";
import { useClickOutside, useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Star } from "tabler-icons-react";
import searchStation from "../../requests/ris/stationSearch";
import Favourite from "../../utils/favourites";
import useSWR from "swr";
import Button from "../ui/button/Button";
import { FiMapPin } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export type StationSearchBarProps = {
  setSelectedStationId: Dispatch<SetStateAction<string | undefined>>;
};

export default function StationSearchBar(props: StationSearchBarProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const [favourites, setFavourites] = useLocalStorage<Favourite[]>({
    key: "favourites",
    defaultValue: [],
  });

  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const { data } = useSWR(debouncedSearch, (key) => searchStation(key));

  const [locatePopup, setLocatePopup] = useState(false);

  // idc enough to write a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [locateData, setLocateData] = useState<any[] | undefined>(undefined);

  return (
    <>
      <div className="relative w-full">
        <div className={"flex w-full flex-row gap-2"}>
          <input
            className=" w-full rounded-md bg-zinc-800 p-2 text-white outline-none"
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              props.setSelectedStationId(undefined);
            }}
            onClick={() => {
              setOpen(true);
            }}
            value={search}
            placeholder={"Suche eine Station"}
          />
          <Button
            onClick={() => {
              const geolocation = navigator.geolocation;
              geolocation.getCurrentPosition((position) => {
                fetch(
                  `https://v6.db.transport.rest/locations/nearby?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&results=5&language=de`,
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setLocateData(data);
                    setLocatePopup(true);
                  });
              });
            }}
            className={"px-3"}
            title={"Station mit aktuellem Standort suchen"}
          >
            <FiMapPin />
          </Button>
        </div>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className={"absolute z-30 m-auto mt-2 flex w-full rounded-md bg-zinc-800 p-2 text-white"} ref={ref}>
            {search == "" ? (
              <div className="flex w-full flex-col p-1">
                <p className="text-lg font-semibold text-white">Favoriten</p>
                {favourites.length > 0 ? (
                  <div className="flex w-full flex-col">
                    {favourites.map((favourite) => (
                      <StationResultDisplay
                        station={favourite}
                        favourites={favourites}
                        setFavourites={setFavourites}
                        key={favourite.evaNr}
                        onClick={(station) => {
                          setSearch(station.name);
                          setOpen(false);
                          props.setSelectedStationId(station.evaNr);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Du hast keine Favoriten</p>
                )}
              </div>
            ) : (
              <>
                {!data ? (
                  <div className="flex h-32 w-full justify-center align-middle">
                    <p>Lädt...</p>
                  </div>
                ) : (
                  <div className="flex w-full flex-col">
                    {data.stopPlaces
                      .filter((station) => station.evaNumber != null)
                      .map((station) => (
                        <StationResultDisplay
                          station={{
                            evaNr: station.evaNumber!,
                            name: station.names.DE.nameLong,
                          }}
                          favourites={favourites}
                          setFavourites={setFavourites}
                          key={station.evaNumber}
                          onClick={(station) => {
                            props.setSelectedStationId(station.evaNr);
                            setSearch(station.name);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </Transition>
      </div>
      <Transition appear show={locatePopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onClose={() => {}}
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
                  <Dialog.Title className={"flex w-full flex-row justify-between text-xl font-bold"}>
                    <p>Stationen in deiner Nähe</p>
                    <button
                      className={"rounded-md p-1 transition-all duration-200 hover:bg-zinc-900"}
                      onClick={() => setLocatePopup(false)}
                    >
                      <IoCloseOutline color={"white"} size={24} />
                    </button>
                  </Dialog.Title>
                  <Dialog.Description
                    as={"div"}
                    className={"relative flex h-fit w-full flex-col justify-start gap-2 pt-5 text-white"}
                  >
                    {locateData &&
                      locateData
                        .filter((station) => station.id != null)
                        .map((station) => (
                          <button
                            key={station.id}
                            onClick={() => {
                              setSearch(station.name);
                              setOpen(false);
                              props.setSelectedStationId(station.id);
                              setLocatePopup(false);
                            }}
                            className={
                              "flex w-full flex-row justify-between gap-2 truncate rounded-md p-2 hover:bg-zinc-700"
                            }
                          >
                            {station.name}
                          </button>
                        ))}
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

type StationResultDisplayProps = {
  station: Favourite;
  favourites: Favourite[];
  setFavourites: Dispatch<SetStateAction<Favourite[]>>;
  onClick: (station: Favourite) => void;
};

function StationResultDisplay(props: StationResultDisplayProps): JSX.Element {
  return (
    <div className={"flex rounded-md p-2 hover:bg-zinc-700"}>
      <button
        className="flex w-full text-start align-middle text-base"
        key={props.station.evaNr}
        onClick={() => {
          props.onClick(props.station);
        }}
      >
        <p className="m-auto w-full align-middle">{props.station.name}</p>
      </button>
      <button
        className="z-40"
        onClick={(event) => {
          event.preventDefault();
          const foundFav = props.favourites.find((value) => value.evaNr === props.station.evaNr);
          if (foundFav) {
            props.setFavourites((prevState) => prevState.filter((value) => value.evaNr !== props.station.evaNr));
          } else {
            props.setFavourites((prevState) =>
              prevState.concat([
                {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  evaNr: props.station.evaNr!,
                  name: props.station.name,
                },
              ]),
            );
          }
        }}
      >
        <Star
          fill={props.favourites.filter((value) => value.evaNr === props.station.evaNr).length > 0 ? "orange" : "gray"}
          color={props.favourites.filter((value) => value.evaNr === props.station.evaNr).length > 0 ? "orange" : "gray"}
        />
      </button>
    </div>
  );
}
