import dayjs from "dayjs";
import { getApiBaseUrl } from "../get_base_url";

export type StationBoard = {
  eva: string;
  name: string;
  timeStart: string;
  timeEnd: string;
  items: StationBoardItem[];
};

export type StationBoardItem = {
  risId?: string;
  irisId?: string;

  stationEva: string;
  stationName: string;

  category: string;
  trainType: string;
  trainNumber: number;
  lineIndicator: string;

  cancelled: boolean;

  arrival?: DepartureArrival;
  departure?: DepartureArrival;

  platformScheduled?: string;
  platformRealtime?: string;

  originEva?: string;
  originName: string;
  destinationEva?: string;
  destinationName: string;

  administation?: StationBoardItemAdministration;

  additionalInfo?: IrisInformation;
};

export type IrisInformation = {
  irisId: string;
  replaces?: string;
  route: RouteStop[];
  messages: StationBoardMessage[];
};

export type StationBoardItemAdministration = {
  id: string;
  operatorCode: string;
  operatorName: string;
  risOperatorName: string;
};

export type DepartureArrival = {
  timeScheduled: string;
  timeRealtime: string;
  timeType: string;

  wings: string[];
};

export type StationBoardMessage = {
  id: string;
  timestamp: string;
  /// The message code (e.G. `59` for `Schnee und Eis`)
  code?: number;
  /// The matched text from the message code (e.G. `Schnee und Eis` when code is `95`)
  matchedText?: string;
  category?: string;
  validFrom?: string;
  validTo?: string;
  messageStatus:
    | "HafasInformationManager"
    | "QualityChange"
    | "Free"
    | "CauseOfDelay"
    | "Ibis"
    | "UnassignedIbis"
    | "Disruption"
    | "Connection";
  priority?: "high" | "medium" | "low" | "done";
};

export type RouteStop = {
  name: string;
  cancelled: boolean;
  added: boolean;
};

export async function stationBoard(
  eva: string,
  date: dayjs.Dayjs,
  lookbehind?: number,
  lookahead?: number
): Promise<StationBoard> {
  let start = date.subtract(lookbehind ?? 5, "minutes").second(0);
  let end = date.add(lookahead ?? 180, "minutes").second(0);

  if (start.minute() % 5 !== 0) {
    start = start.minute(start.minute() - (start.minute() % 5));
  }

  if (end.minute() % 5 !== 0) {
    end = end.minute(end.minute() - (end.minute() % 5));
  }

  const response = await fetch(
    `${getApiBaseUrl()}/v1/station_board/${eva}?timeStart=${start.format()}&timeEnd=${end.format()}`,
    {
      method: "GET",
      next: {
        revalidate: 30,
      },
    }
  );

  return response.json();
}
