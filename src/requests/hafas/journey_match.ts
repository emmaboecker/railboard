import {getBaseUrl} from "../../server/base-url";

export type Station = {
  name: string
}

export type Trip = {
  id: string
  destination: Station,
  origin: Station,
  line: {
    name: string
  }
}

export default async function journeyMatch(input: string, date: Date): Promise<Array<Trip>> {
  const response = await fetch(`${/api/hafas/journey_match?q=${input}&date=${date}`, {
    method: "GET",
  });

  return response.json();
}
