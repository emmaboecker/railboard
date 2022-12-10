import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export type Stop = {
  station: {
    id: "8103000";
    title: "Wien Hbf";
    coordinates: {
      lng: 16.375865;
      lat: 48.184923;
    };
  };
  departure: {
    scheduledTime: "2022-12-11T14:13:00.000Z";
    time: "2022-12-11T14:13:00.000Z";
    reihung: true;
  };
  arrival: {
    scheduledTime: "2022-12-11T16:31:00.000Z";
    time: "2022-12-11T16:31:00.000Z";
    reihung: true;
  };
};

export type Trip = {
  train: {
    name: string;
    line: string;
    admin: string;
    number: string;
    type: string;
    operator: {
      name: string;
      icoX: number;
    };
  };
  stops: Stop[];
  jid: string;
  firstStop: {
    station: {
      id: string;
      title: string;
      coordinates: {
        lng: number;
        lat: number;
      };
    };
    departure?: {
      scheduledTime: string;
      time: string;
      reihung: boolean;
    };
  };
  lastStop: {
    station: {
      id: string;
      title: string;
      coordinates: {
        lng: number;
        lat: number;
      };
    };
    arrival?: {
      scheduledTime: string;
      time: string;
      reihung: boolean;
    };
  };
};

export default async function journeyMatch(input: string, date: Date): Promise<Array<Trip>> {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const response = await fetch(`https://bahn.expert/api/hafas/v2/journeyMatch`, {
    method: "POST",
    body: JSON.stringify({
      trainName: input,
      initialDepartureDate: dayjs(date).tz("Europe/Berlin").format("YYYY-MM-DDTHH:mm:ss"),
      onlyRT: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    return [];
  }
}
