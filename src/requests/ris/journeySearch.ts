import dayjs from "dayjs";

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

export async function journeySearch(
  category: string,
  number: string,
  date: dayjs.Dayjs
): Promise<RisJourneySearchElement[]> {
  const response = await fetch(
    `https://api.rail.stckoverflw.net/ris/v1/journey_search/${category}/${number}?date=${date.format("YYYY-MM-DD")}`,
    {
      method: "GET",
    }
  );

  return response.json();
}
