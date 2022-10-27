import {
  arrivalBoard,
  ArrivalBoardResult,
  departureBoard,
  DepartureBoardResult,
} from "../requests/vendo/stationBoard";

export default async function getStationBoardData(
  stationId: string,
  datetimeParam: number
) {
  const datetime = new Date(datetimeParam);

  const time = `${datetime.getHours().toString().padStart(2, "0")}:${datetime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const date = `${datetime.getFullYear().toString()}-${(
    (datetime.getMonth() ?? 0) + 1
  )
    .toString()
    .padStart(2, "0")}-${datetime.getDate().toString().padStart(2, "0")}`;

  const body = {
    anfragezeit: time,
    datum: date,
    ursprungsBahnhofId: stationId,
    verkehrsmittel: [],
  };

  const departure = await departureBoard(body);
  const arrival = await arrivalBoard(body);

  const result: StationBoardResponse = {
    trains: [],
  };

  const map = new Map<string, (DepartureBoardResult | ArrivalBoardResult)[]>();

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
          scheduledTime: arrival.ankunftsDatum,
          time: arrival.ezAnkunftsDatum,
        },
      };
    }
    if (departure != null) {
      train.departure = {
        destination: departure.richtung,
        time: {
          scheduledTime: departure.abgangsDatum,
          time: departure.ezAbgangsDatum,
        },
      };
    }

    result.trains.push(train);
  });

  result.trains.sort((a, b) => {
    const aTime =
      a.departure != null
        ? new Date(a.departure.time.scheduledTime).getTime()
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          new Date(a.arrival!.time.scheduledTime).getTime();
    const bTime =
      b.departure != null
        ? new Date(b.departure.time.scheduledTime).getTime()
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          new Date(b.arrival!.time.scheduledTime).getTime();

    return aTime - bTime;
  });

  return result;
}

export type StationBoardResponse = {
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
  scheduledTime: string;
  time?: string;
};
