"use client";

import { useLocalStorage } from "@mantine/hooks";
import TransportTypeFilter, { TransportType, transportTypes } from "../../../components/station_board/filter/TransportTypeFilter";

export default function FilterButtonContainer() {
  const [currentTransportTypes, setTransportTypes] = useLocalStorage<TransportType[]>({
    key: "transport-types",
    defaultValue: transportTypes
  });

  return (
    <div className={"m-2"}>
      <TransportTypeFilter setTransportTypes={setTransportTypes} transportTypes={currentTransportTypes} />
    </div>
  )
}