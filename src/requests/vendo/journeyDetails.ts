export type HimNotice = {
  text: string;
  priority: string;
  heading: string;
  lastUpdate: string;
};

export type Text = {
  text: string;
  key?: string;
};

export type JourneyDetailsVendoResponse = {
  fahrplan: {
    regulaererFahrplan: string;
    tageOhneFahrt: string;
  };
  kurztext: string;
  mitteltext: string;
  langtext: string;
  halte: {
    ankunftsDatum?: string;
    abgangsDatum?: string;
    ezAnkunftsDatum?: string;
    ezAbgangsDatum?: string;
    ort: string;
    gleis?: string;
    ezGleis?: string;
    attributNotizen: Text[];
    echtzeitNotizen: Text[];
    serviceNotiz?: { text: string; key: string };
    himNotizen: HimNotice[];
    auslastungsInfos: Text[];
  }[];
  echtzeitNotizen: Text[];
  himNotizen: HimNotice[];
  attributNotizen: Text[];
  verkehrsmittelNummer: string;
  richtung: string;
  produktGattung: string;
  reisetag: string;
};

export default async function journeyDetails(
  id: string
): Promise<JourneyDetailsVendoResponse> {
  const rawResponse = await fetch(
    `https://app.vendo.noncd.db.de/mob/zuglauf/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x.db.vendo.mob.zuglauf.v1+json",
        Accept: "application/x.db.vendo.mob.zuglauf.v1+json",
        "X-Correlation-ID": "ratio",
      },
    }
  );

  return rawResponse.json();
}
