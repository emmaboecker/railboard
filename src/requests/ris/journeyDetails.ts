export default async function journeyDetails(id: string): Promise<RisJourneyDetails> {
  const rawResponse = await fetch(`https://api.rail.stckoverflw.net/ris/v1/journey_details/${id}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  return rawResponse.json();
}

export type RisJourneyDetails = {
  id: string;
  journeyType: string;
  originName: string;
  originId: string;
  destinationName: string;
  destinationId: string;
  cancelled: boolean;
  stops: RisJourneyStop[];
};

export type RisJourneyStop = {
  stopId: string;
  stopName: string;

  arrival?: JourneyStopTime;

  departure?: JourneyStopTime;
  messages: JourneyDetailsMessage[];
  disruptions: JourneyStopDisruption[];
  on_demand: boolean;
  cancelled: boolean;
  additional: boolean;

  transport: Transport;

  scheduledPlatform?: string;

  realPlatform?: string;
  administration: JourneyStopAdministration;
};

export type JourneyStopTime = {
  scheduled: string;

  realtime?: string;
  timeType: string;
};

export type JourneyStopAdministration = {
  id: string;
  name: string;
  operatorCode: string;
  risName: string;
};

export type JourneyDetailsMessage = {
  code?: string;
  type: string;
  displayPriority?: number;
  category?: string;
  text: string;
  textShort?: string;
};

export type JourneyStopDisruption = {
  id: string;
  communicationId?: string;
  priority: number;
  text: string;
  textShort?: string;
};

export type Transport = {
  type: string;
  category: string;
  number: number;
  line?: string;
  label?: string;
  replacementTransport?: string;
};
