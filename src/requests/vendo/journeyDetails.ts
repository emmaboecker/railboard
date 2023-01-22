import { Time } from "./stationBoard";

export type HimNotice = {
  text: string;
  priority: string;
  heading: string;
};

export type Text = {
  text: string;
  key?: string;
};

export type JourneyDetailsVendoResponse = {
  schedule: {
    regularSchedule: string;
    daysOfOperation: string;
  };
  shortName: string;
  name: string;
  longName: string;
  stops: VendoStop[];
  notes: string[];
  himNotices: HimNotice[];
  attributes: Text[];
  transportNumber?: string;
  destination: string;
  productType: string;
  journeyDay: string;
};

export type VendoStop = {
  name: string;
  arrival?: Time;
  departure?: Time;
  platform?: string;
  realtimePlatform?: string;
  attributes: Text[];
  notes: string[];
  serviceNote?: { text: string; key: string };
  himNotes: HimNotice[];
};

// export type DemandInformation = {
//   klasse: "KLASSE_1" | "KLASSE_2";
//   stufe: number;
//   anzeigeTextKurz: string;
//   anzeigeTextLang: string;
// }; // Vendo currently doesn't actually respond with this

export default async function journeyDetails(id: string): Promise<JourneyDetailsVendoResponse> {
  const rawResponse = await fetch(`https://api.rail.stckoverflw.net/vendo/v1/journey_details/${id}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  return rawResponse.json();
}
