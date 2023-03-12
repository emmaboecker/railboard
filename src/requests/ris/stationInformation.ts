import { getApiBaseUrl } from "../get_base_url";

export type StationInformation = {
  eva: string;
  stationId?: string;
  names: StationNameContent;
  metropolis?: string;
  availableTransports: string[];
  transportAssociations: string[];
  countryCode: string;
  state: string;
  municipalityKey: string;
  timeZone: string;
  position: Position;
};

export type StationNameContent = {
  nameLong: string;
  speechLong?: string;
  speechShort?: string;
};

export type Position = {
  longitude: number;
  latitude: number;
};

export async function stationInformation(eva: string): Promise<StationInformation> {
  const response = await fetch(`${getApiBaseUrl()}/ris/v1/station/${eva}`, {
    method: "GET",
  });

  return response.json();
}
