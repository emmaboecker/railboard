export type StationSearchRequest = {
  locationTypes: string[];
  searchTerm: string;
};

export type StationSearchResponse = StationSearchResult[];

export type StationSearchResult = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  evaNr: string;
  locationId: string;
  locationType: string;
  name: string;
  products: string[];
  weight: number;
};

export default async function searchStation(
  body: StationSearchRequest
): Promise<StationSearchResponse> {
  const response = await fetch(
    "https://app.vendo.noncd.db.de/mob/location/search",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x.db.vendo.mob.location.v3+json",
        Accept: "application/x.db.vendo.mob.location.v3+json",
        "X-Correlation-ID": "ratio",
      },
    }
  );

  return response.json();
}
