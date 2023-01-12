export type CoachSequence = {
  data: {
    istformation: CoachSequenceData;
  };
};

export type CoachSequenceData = {
  fahrtrichtung: string;
  allFahrzeuggruppe: CoachSequenceVehicle[];
  halt: CoachSequenceStop;
  liniebezeichnung: string;
  zuggattung: string;
  zugnummer: string;
  serviceid: string;
  planstarttag: string;
  fahrtid: string;
  istplaninformation: boolean;
};

export type CoachSequenceVehicle = {
  allFahrzeug: CoachSequenceVehicleCoach[];
  fahrzeuggruppebezeichnung: string;
  zielbetriebsstellename: string;
  startbetriebsstellename: string;
  verkehrlichezugnummer: string;
};

export type CoachSequenceVehicleCoach = {
  allFahrzeugausstattung: CoachSequenceCoachFeature[];
  kategorie: string;
  fahrzeugnummer: string;
  orientierung: string;
  positioningruppe: string;
  fahrzeugsektor: string;
  fahrzeugtyp: string;
  wagenordnungsnummer: string;
  positionamhalt: CoachSequencePlatformPosition;
  status: string;
};

export type CoachSequenceCoachFeature = {
  anzahl: string;
  ausstattungsart: string;
  bezeichnung: string;
  status: string;
};

export type CoachSequenceStop = {
  abfahrtszeit: string;
  ankunftszeit: string;
  bahnhofsname: string;
  evanummer: string;
  gleisbezeichnung: string;
  haltid: string;
  rl100: string;
  allSektor: CoachSequenceSector[];
};

export type CoachSequenceSector = {
  positionamgleis: CoachSequencePlatformPosition;
  sektorbezeichnung: string;
};

export type CoachSequencePlatformPosition = {
  startmeter: string;
  startprozent: string;
  endemeter: string;
  endeprozent: string;
};

export default async function coachSequence(
  lineNumber: string,
  time: string
): Promise<CoachSequence> {
  const reponse = await fetch(
    `https://www.apps-bahn.de/wr/wagenreihung/1.0/${lineNumber}/${time}`,
    {
      method: "GET",
      next: {
        revalidate: 90,
      },
    }
  );

  return reponse.json();
}
