import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import searchStation from "../../../requests/vendo/stationSearch";
import {
  arrivalBoard,
  ArrivalBoardResult,
  departureBoard,
  DepartureBoardResult,
} from "../../../requests/vendo/stationBoard";

export const vendoRouter = router({
  stationSearch: publicProcedure
    .input(z.object({ term: z.string() }))
    .query(async ({ input }) => {
      return await searchStation({
        locationTypes: ["ST"],
        searchTerm: input.term,
      });
    }),
  stationBoard: publicProcedure
    .input(
      z.object({
        stationId: z.string(),
        datetime: z.custom<Date>(),
        transportTypes: z.array(z.string()),
      })
    )
    .query(async ({ input }): Promise<StationBoardResponse> => {
      const body = {
        anfragezeit: `${input.datetime
          .getHours()
          .toString()
          .padStart(2, "0")}:${input.datetime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        datum: `${input.datetime.getFullYear().toString()}-${(
          input.datetime.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${input.datetime
          .getDate()
          .toString()
          .padStart(2, "0")}`,
        ursprungsBahnhofId: input.stationId,
        verkehrsmittel: input.transportTypes,
      };

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `{"query":"query Query {station(id: ${input.stationId}) {id name isMeta}}","operationName":"Query"}`,
      };

      const stationInfo: StationInfoResponse = await fetch(
        "https://hafas-graphql-cf.nycode.dev/",
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));

      const departure = await departureBoard(body);
      const arrival = await arrivalBoard(body);

      const result: StationBoardResponse = {
        requestedStationId: stationInfo.data.station.id.toString(),
        requestedStationName: stationInfo.data.station.name.toString(),
        isMetaStation: stationInfo.data.station.isMeta,
        trains: [],
      };

      const map = new Map<
        string,
        (DepartureBoardResult | ArrivalBoardResult)[]
      >();

      departure.bahnhofstafelAbfahrtPositionen.forEach((element) => {
        map.set(element.zuglaufId, [element]);
      });

      arrival.bahnhofstafelAnkunftPositionen.forEach((element) => {
        const existing = map.get(element.zuglaufId) ?? [];
        map.set(element.zuglaufId, existing.concat(element));
      });

      map.forEach((value, key) => {
        const first = value[0];
        const second = value[1];

        const arrival =
          first != null
            ? "ankunftsDatum" in first
              ? (first as ArrivalBoardResult)
              : second != null
              ? "ankunftsDatum" in second
                ? (second as ArrivalBoardResult)
                : undefined
              : undefined
            : undefined;

        const departure =
          first != null
            ? "abgangsDatum" in first
              ? (first as DepartureBoardResult)
              : second != null
              ? "abgangsDatum" in second
                ? (second as DepartureBoardResult)
                : undefined
              : undefined
            : undefined;

        if (arrival == null && departure == null) {
          throw new Error("arrival or departure should be defined");
        }

        const arrivalOrDeparture: ArrivalBoardResult | DepartureBoardResult =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          arrival ?? departure!;

        const train: StationBoardTrain = {
          journeyId: key,
          scheduledPlatform: arrivalOrDeparture.gleis,
          platform: arrivalOrDeparture.ezGleis,
          product: arrivalOrDeparture.produktGattung,
          name: arrivalOrDeparture.mitteltext,
          shortName: arrivalOrDeparture.kurztext,
          notices:
            departure != null
              ? departure.echtzeitNotizen.map((notice) => notice.text)
              : arrival?.echtzeitNotizen.map((notice) => notice.text) ?? [],
        };

        if (arrival != null) {
          train.arrival = {
            origin: arrival.abgangsOrt,
            time: {
              scheduledTime: new Date(arrival.ankunftsDatum),
              time:
                arrival.ezAnkunftsDatum != null
                  ? new Date(arrival.ezAnkunftsDatum)
                  : undefined,
            },
          };
        }
        if (departure != null) {
          train.departure = {
            destination: departure.richtung,
            time: {
              scheduledTime: new Date(departure.abgangsDatum),
              time:
                departure.ezAbgangsDatum != null
                  ? new Date(departure.ezAbgangsDatum)
                  : undefined,
            },
          };
        }

        result.trains.push(train);
      });

      result.trains.sort((a, b) => {
        const aTime =
          a.departure != null
            ? a.departure.time.scheduledTime.getTime()
            : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              a.arrival!.time.scheduledTime.getTime();
        const bTime =
          b.departure != null
            ? b.departure.time.scheduledTime.getTime()
            : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              b.arrival!.time.scheduledTime.getTime();

        return aTime - bTime;
      });

      return result;
    }),
});

type StationInfoResponse = {
  data: {
    station: {
      id: number;
      name: string;
      isMeta: boolean;
    };
  };
};

export type StationBoardResponse = {
  requestedStationId: string;
  requestedStationName: string;
  isMetaStation: boolean;
  trains: StationBoardTrain[];
};

export type StationBoardTrain = {
  journeyId: string;
  arrival?: {
    origin: string;
    time: Time;
  };
  departure?: {
    destination: string;
    time: Time;
  };
  product: string;
  shortName: string;
  name: string;
  scheduledPlatform?: string;
  platform?: string;
  notices: string[];
};

export type Time = {
  scheduledTime: Date;
  time?: Date;
};
