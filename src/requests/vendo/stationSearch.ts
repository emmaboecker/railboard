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
  evaNr?: string;
  locationId: string;
  locationType: string;
  name: string;
  products: string[];
  weight?: number;
};

// const getBaseUrl = () => {
//   if (typeof window !== "undefined") return ""; // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };

export default async function searchStation(query: string): Promise<StationSearchResponse> {
  const response = await fetch(`https://api.rail.stckoverflw.net/vendo/v1/location_search/${query}`, {
    method: "GET",
  });

  return response.json();
}
