"use client";

import { useElementSize, useLocalStorage } from "@mantine/hooks";
import { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import StationBoardDisplayElement from "./StationBoardDisplayElement";
import { StationBoardResponse } from "../../data/station_board";
import { useRouter } from "next/navigation";
import { TransportType, transportTypes } from "./filter/TransportTypeFilter";

export type StationBoardDisplayContainerProps = {
  data: StationBoardResponse;
};

export default function StationBoardDisplayContainer(
  props: StationBoardDisplayContainerProps
): JSX.Element {
  const { ref, width, height } = useElementSize();

  const [currentTransportTypes] = useLocalStorage<TransportType[]>({
    key: "transport-types",
    defaultValue: transportTypes
  });

  const filteredData = props.data.trains.filter(train => {
    let isIncluded = false;
    currentTransportTypes.forEach(value => {
      const productTypes = getProductTypesFromVendoType(value);
      if (productTypes.includes(train.product)) {
        isIncluded = true;
      }
    })
    return isIncluded;
  })

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const trainData = filteredData[index]!;

    const router = useRouter()

    return (
      <div style={style}>
        <button
          className={
            "h-full w-full border-b-[1px] border-zinc-600 pr-2 hover:bg-zinc-800/50"
          }
          key={trainData.journeyId}
          onClick={() => {
            router.push(`/journey/${encodeURIComponent(trainData.journeyId)}`)
          }}
        >
          <StationBoardDisplayElement train={trainData} />
        </button>
      </div>
    );
  };

  return (
    <div className={"flex h-full w-full"} ref={ref}>
      <List
        itemSize={100}
        height={height}
        itemCount={filteredData.length}
        width={width}
      >
        {Row}
      </List>
    </div>
  );


}


function getProductTypesFromVendoType(transportType: TransportType): string[] {
  let productTypes: string[];

  switch (transportType) {
    case TransportType.HighspeedTrains:
      productTypes = ["ICE"]
      break;
    case TransportType.ICAndECTrains:
      productTypes = ["IC_EC"];
      break;
    case TransportType.InterregionalAndFastTrains:
      productTypes = [""]; // idk
      break;
    case TransportType.RegionalAndOtherTrains:
      productTypes = ["RB"];
      break;
    case TransportType.SuburbanTrains:
      productTypes = ["SBAHN"];
      break;
    case TransportType.Tram:
      productTypes = ["STR"];
      break;
    case TransportType.Subway:
      productTypes = ["UBAHN"];
      break;
    case TransportType.Busses:
      productTypes = ["BUS"];
      break;
    case TransportType.Boats:
      productTypes = ["SCHIFF"];
      break;
    case TransportType.CallRequiringTransportTypes:
      productTypes = ["ANRUFPFLICHTIGEVERKEHRE"];
      break;
  }

  return productTypes
}
