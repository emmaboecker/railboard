import dayjs from "dayjs";
import { getApiBaseUrl } from "../get_base_url";

export type RisJourneySearchElement = {
  journeyID: string;
  date: string;
  administrationID: string;
  originSchedule: RisJourneySearchSchedule;
  destinationSchedule: RisJourneySearchSchedule;
  transport: RisJourneySearchTransport;
};

export type RisJourneySearchSchedule = {
  evaNumber: string;
  name: string;
};

export type RisJourneySearchTransport = {
  type: string;
  category: string;
  number: number;
  line?: string;
  label?: string;
  replacementTransport?: string;
};

export default function journeySearch(
  category: string,
  number: string,
  date: dayjs.Dayjs
): Promise<RisJourneySearchElement[]> {
  

  const response = fetch(
    `${getApiBaseUrl()}/ris/v1/journey_search/${category}/${number}?date=${date.format("YYYY-MM-DD")}`
  ).then((response) => response.json());

  console.log(response);

  return response;
}
