export async function getStationInfoData(stationId: number): Promise<StationInfo> {
  const stationInfo: StationInfoResponse = await fetch("https://hafas-graphql-cf.nycode.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"query":"query Query {station(id: ${stationId}) {id name isMeta}}","operationName":"Query"}`,
    cache: "no-store",
  }).then((response) => response.json());

  return stationInfo.data.station;
}

type StationInfoResponse = {
  data: {
    station: StationInfo;
  };
};

export type StationInfo = {
  id: number;
  name: string;
  isMeta: boolean;
};
