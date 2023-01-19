export type StationBoardResponse = {
  day: string;
  time: string;
  id: string;
  stationBoard: StationBoardTrain[];
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
  productType?: string;
  shortName?: string;
  name: string;
  scheduledPlatform?: string;
  realtimePlatform?: string;
  notes: string[];
};

export type Time = {
  scheduled: string;
  realtime?: string;
};

export async function stationBoard(eva: string, date: number): Promise<StationBoardResponse> {
  const normalized_date = date / 1000;
  const response = await fetch(
    `https://api.rail.stckoverflw.net/vendo/v1/station_board/${eva}?date=${normalized_date.toString().split(".")[0]}`,
    {
      method: "GET",
      next: {
        revalidate: 30,
      },
    }
  );

  return response.json();
}
