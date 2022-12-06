import { useLocalStorage } from "@mantine/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { Star } from "tabler-icons-react";
import searchStation, { StationSearchResult } from "../../requests/vendo/stationSearch";
import Favourite from "../../utils/favourites";

import "react-datepicker/dist/react-datepicker.css";
import BasicSearch from "./BasicSearch";

export type StationSearchBarProps = {
  setSelectedStationId: Dispatch<SetStateAction<string | undefined>>;
};

export default function StationSearchBar(props: StationSearchBarProps): JSX.Element {
  const [favourites, setFavourites] = useLocalStorage<Favourite[]>({
    key: "favourites",
    defaultValue: [],
  });

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <BasicSearch
      placeholder={"Suche eine Station"}
      onChange={() => props.setSelectedStationId(undefined)}
      alwaysPresentData={
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
      }
      renderer={(station) => (
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
      )}
      data={(input: string) =>
        searchStation({
          searchTerm: input,
          locationTypes: [],
        })
      }
      searchState={[search, setSearch]}
      open={[open, setOpen]}
    />
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
          const foundFav = props.favourites.find((value) => value.evaNr === props.station.evaNr);
          if (foundFav) {
            props.setFavourites((prevState) => prevState.filter((value) => value.evaNr !== props.station.evaNr));
          } else {
            const newFavourites = props.favourites.concat([
              {
                evaNr: props.station.evaNr,
                name: props.station.name,
                locationId: props.station.locationId,
              },
            ]);
            props.setFavourites(newFavourites);
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
