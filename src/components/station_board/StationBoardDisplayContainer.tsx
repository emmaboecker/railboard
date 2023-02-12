"use client";

import { useElementSize, useLocalStorage } from "@mantine/hooks";
import { CSSProperties, useState } from "react";
import { FixedSizeList as List } from "react-window";
import StationBoardDisplayElement from "./StationBoardDisplayElement";
import { TransportType, transportTypes } from "./filter/TransportTypeFilter";
import DetailsPopup from "./details/DetailsPopup";
import { StationBoard } from "../../requests/custom/stationBoard";

export type StationBoardDisplayContainerProps = {
  data: StationBoard;
};

export default function StationBoardDisplayContainer(props: StationBoardDisplayContainerProps): JSX.Element {
  const { ref, width, height } = useElementSize();

  const [currentTransportTypes] = useLocalStorage<TransportType[]>({
    key: "transport-types",
    defaultValue: transportTypes,
  });

  const filteredData = props.data.items.filter((train) => {
    let isIncluded = false;
    currentTransportTypes.forEach((value) => {
      const productTypes = filterFormat(value, train.trainType);
      if (productTypes.includes(train.trainType ?? "")) {
        isIncluded = true;
      }
    });
    return isIncluded;
  });

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const trainData = filteredData[index]!;

    const [open, setOpen] = useState(false);

    return (
      <div style={style}>
        <button
          className={"absolute h-full w-full border-b-[1px] border-zinc-600 pr-2 hover:bg-zinc-800/50"}
          key={trainData.risId ?? trainData.irisId}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <StationBoardDisplayElement train={trainData} />
          <DetailsPopup open={open} setOpen={setOpen} train={trainData} />
        </button>
      </div>
    );
  };

  return (
    <div className={"flex h-full w-full"} ref={ref}>
      <List itemSize={100} height={height} itemCount={filteredData.length} width={width}>
        {Row}
      </List>
    </div>
  );
}

function filterFormat(transportType: TransportType, category: string): string[] {
  let productTypes: string[] = [];

  switch (transportType) {
    case TransportType.HighspeedTrains:
      productTypes = ["HIGH_SPEED_TRAIN", "ICE", "ECE", "FLX", "TGV", "RJ"];
      break;
    case TransportType.ICAndECTrains:
      productTypes = ["INTERCITY_TRAIN", "IC", "EC", "NJ", "EN"];
      break;
    case TransportType.InterregionalAndFastTrains:
      productTypes = ["IR"];
      break;
    case TransportType.SuburbanTrains:
      productTypes = ["CITY_TRAIN", "S"];
      break;
    case TransportType.Tram:
      productTypes = ["TRAM", "STR", "STB"];
      break;
    case TransportType.Subway:
      productTypes = ["SUBWAY", "U"];
      break;
    case TransportType.Busses:
      productTypes = ["BUS", "Bus"];
      break;
    case TransportType.Boats:
      productTypes = ["FERRY"];
      break;
    case TransportType.CallRequiringTransportTypes:
      productTypes = ["SHUTTLE"];
      break;
    case TransportType.RegionalAndOtherTrains:
      if (
        transportTypes
          .filter((value) => value !== TransportType.RegionalAndOtherTrains)
          .find((value) => filterFormat(value, category).includes(category)) == null
      ) {
        productTypes = ["REGIONAL_TRAIN", "RE", "RB", "HLB", "VIA", category];
      }
      break;
  }

  return productTypes;
}
