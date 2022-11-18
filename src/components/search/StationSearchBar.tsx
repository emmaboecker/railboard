import { Transition } from "@headlessui/react";
import {
  useClickOutside,
  useDebouncedValue,
  useLocalStorage,
} from "@mantine/hooks";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Star } from "tabler-icons-react";
import searchStation, {
  StationSearchResult,
} from "../../requests/vendo/stationSearch";
import Favourite from "../../utils/favourites";
import useSWR from "swr";

import "react-datepicker/dist/react-datepicker.css";

export type StationSearchBarProps = {
  setSelectedStationId: Dispatch<SetStateAction<string | undefined>>;
};

export default function StationSearchBar(
  props: StationSearchBarProps
): JSX.Element {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const [favourites, setFavourites] = useLocalStorage<Favourite[]>({
    key: "favourites",
    defaultValue: [],
  });

  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const { data } = useSWR(debouncedSearch, (key) =>
    searchStation({
      searchTerm: key,
      locationTypes: [],
    })
  );

  return (
    <div className="relative w-full">
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
        <div
          className={
            "absolute z-30 m-auto mt-2 flex w-full rounded-md bg-zinc-800 p-2 text-white"
          }
          ref={ref}
        >
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
                <p className="text-sm text-gray-400">
                  You don&apos;t have any favourites
                </p>
              )}
            </div>
          ) : (
            <>
              {!data ? (
                <div className="flex h-32 w-full justify-center align-middle">
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  {data.map((station) => (
                    <StationResultDisplay
                      station={station}
                      favourites={favourites}
                      setFavourites={setFavourites}
                      key={station.evaNr}
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
  );
}

type StationResultDisplayProps = {
  station: Favourite | StationSearchResult;
  favourites: Favourite[];
  setFavourites: Dispatch<SetStateAction<Favourite[]>>;
  onClick: (station: Favourite | StationSearchResult) => void;
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
          const foundFav = props.favourites.find(
            (value) => value.evaNr === props.station.evaNr
          );
          if (foundFav) {
            props.setFavourites((prevState) =>
              prevState.filter((value) => value.evaNr !== props.station.evaNr)
            );
          } else {
            props.setFavourites((prevState) =>
              prevState.concat([
                {
                  evaNr: props.station.evaNr,
                  name: props.station.name,
                  locationId: props.station.locationId,
                },
              ])
            );
          }
        }}
      >
        <Star
          fill={
            props.favourites.filter(
              (value) => value.evaNr === props.station.evaNr
            ).length > 0
              ? "orange"
              : "gray"
          }
          color={
            props.favourites.filter(
              (value) => value.evaNr === props.station.evaNr
            ).length > 0
              ? "orange"
              : "gray"
          }
        />
      </button>
    </div>
  );
}
