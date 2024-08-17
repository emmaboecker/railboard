import { getApiBaseUrl } from "../get_base_url";

export type StationSearchResponse = {
  availableTransports: string[];
  evaNumber: string;
  groupMembers: string[];
  names: {
    DE: {
      nameLong: string;
      speechLong: string;
      speechShort: string;
      symbol: string;
    };
  };
  position: {
    latitude: 0;
    longitude: 0;
  };
  stationID: "string";
}[];

// const getBaseUrl = () => {
//   if (typeof window !== "undefined") return ""; // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };

export default async function searchStation(query: string, limit: number = 10): Promise<StationSearchResponse> {
  const response = await fetch(`${getApiBaseUrl()}/ris/v1/station_search/${encodeURIComponent(query)}?limit=${limit}`, {
    method: "GET",
  });

  return response.json();
}
