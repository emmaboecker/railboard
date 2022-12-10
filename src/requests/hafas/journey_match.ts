export type Station = {
  name: string;
};

export type Trip = {
  id: string;
  destination: Station;
  origin: Station;
  line: {
    name: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function journeyMatch(input: string, date: Date): Promise<Array<Trip> | any> {
  const response = await fetch(`/api/hafas/journey_match?q=${input}&date=${date.getTime()}`, {
    method: "GET",
  });

  if (response.status === 200) {
    return response.json();
  } else {
    return response.json();
  }
}
