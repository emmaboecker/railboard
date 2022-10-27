export type StationBoardRequest = {
  anfragezeit: string;
  datum: string;
  ursprungsBahnhofId: string;
  verkehrsmittel: string[];
};

export type DepartureBoardResponse = {
  bahnhofstafelAbfahrtPositionen: DepartureBoardResult[];
};
export type ArrivalBoardResponse = {
  bahnhofstafelAnkunftPositionen: ArrivalBoardResult[];
};

export type DepartureBoardResult = {
  abfrageOrt: string;
  abfrageOrtId: string;
  abgangsDatum: string;
  ezAbgangsDatum?: string;
  echtzeitNotizen: { text: string }[];
  gleis: string;
  ezGleis?: string;
  kurztext: string;
  mitteltext: string;
  produktGattung: string;
  richtung: string;
  zuglaufId: string;
};

export type ArrivalBoardResult = {
  abfrageOrt: string;
  abfrageOrtId: string;
  ankunftsDatum: string;
  ezAnkunftsDatum?: string;
  echtzeitNotizen: { text: string }[];
  gleis: string;
  ezGleis?: string;
  kurztext: string;
  mitteltext: string;
  produktGattung: string;
  abgangsOrt: string;
  zuglaufId: string;
};

export async function departureBoard(
  body: StationBoardRequest
): Promise<DepartureBoardResponse> {
  const response = await fetch(
    "https://app.vendo.noncd.db.de/mob/bahnhofstafel/abfahrt",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x.db.vendo.mob.bahnhofstafeln.v1+json",
        Accept: "application/x.db.vendo.mob.bahnhofstafeln.v1+json",
        "X-Correlation-ID": "ratio",
      },
    }
  );

  return response.json();
}

export async function arrivalBoard(
  body: StationBoardRequest
): Promise<ArrivalBoardResponse> {
  const response = await fetch(
    "https://app.vendo.noncd.db.de/mob/bahnhofstafel/ankunft",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x.db.vendo.mob.bahnhofstafeln.v1+json",
        Accept: "application/x.db.vendo.mob.bahnhofstafeln.v1+json",
        "X-Correlation-ID": "ratio",
      },
    }
  );

  return response.json();
}
