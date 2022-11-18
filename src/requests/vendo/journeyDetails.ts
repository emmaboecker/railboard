export type JourneyDetails = {
  stops: Stop[],
  schedule: {
    regularSchedule: string,
    daysWithoutJourney: string
  },
  normalName: string,
  longName: string,
  himNotices: HimNotice[],
  attributeNotices: Text[],
  direction: string,
  vehicleNumber: string,
  productType: string,
  dayOfJourney: string,
}

type HimNotice = {
  text: string,
  priority: string,
  heading: string,
  lastUpdate: string,
}

type Text = {
  text: string,
  key?: string
}

type Stop = {
  arrivalTime: {
    scheduled?: string,
    realtime?: string
  }
  departureTime: {
    scheduled?: string,
    realtime?: string
  }
  station: string,
  platform?: string,
  realtimePlatform?: string,
  realtimeNotices: Text[],
  himNotices: HimNotice[],
  attributeNotices: Text[],
  serviceNotice?: { text: string, key: string }
}
type VendoResponse = {
  fahrplan: {
    regulaererFahrplan: string,
    tageOhneFahrt: string,
  },
  kurztext: string,
  mitteltext: string,
  langtext: string
  halte: {
    ankunftsDatum?: string,
    abgangsDatum?: string,
    ezAnkunftsDatum?: string,
    ezAbgangsDatum?: string,
    ort: string,
    gleis?: string,
    ezGleis?: string,
    attributNotizen: Text[],
    echtzeitNotizen: Text[],
    serviceNotiz?: { text: string, key: string },
    himNotizen: HimNotice[],
    auslastungsInfos: Text[]
  }[],
  himNotizen: HimNotice[],
  attributNotizen: Text[],
  verkehrsmittelNummer: string,
  richtung: string,
  produktGattung: string,
  reisetag: string
}

export default async function journeyDetails(id: string): Promise<JourneyDetails> {

  const rawResponse = await fetch(
    `https://app.vendo.noncd.db.de/mob/zuglauf/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x.db.vendo.mob.zuglauf.v1+json",
        "Accept": "application/x.db.vendo.mob.zuglauf.v1+json",
        "X-Correlation-ID": "ratio"
      },
      next: {
        revalidate: 60
      }
    }
  );

  const response: VendoResponse = await rawResponse.json();

  return {
    stops: response.halte.map(value => {
      return {
        departureTime: {
          scheduled: value.abgangsDatum,
          realtime: value.ezAbgangsDatum
        },
        arrivalTime: {
          scheduled: value.ankunftsDatum,
          realtime: value.ezAnkunftsDatum
        },
        station: value.ort,
        platform: value.gleis,
        realtimePlatform: value.ezGleis,
        attributeNotices: value.attributNotizen,
        realtimeNotices: value.echtzeitNotizen,
        himNotices: value.himNotizen,
        serviceNotice: value.serviceNotiz
      };
    }),
    schedule: {
      regularSchedule: response.fahrplan.regulaererFahrplan,
      daysWithoutJourney: response.fahrplan.tageOhneFahrt
    },
    normalName: response.mitteltext,
    longName: response.langtext,
    direction: response.richtung,
    productType: response.produktGattung,
    vehicleNumber: response.verkehrsmittelNummer,
    himNotices: response.himNotizen,
    attributeNotices: response.attributNotizen,
    dayOfJourney: response.reisetag
  };
}