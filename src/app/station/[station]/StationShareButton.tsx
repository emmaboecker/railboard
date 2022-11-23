"use client";

import { useCallback } from "react";
import ShareButton from "../../../components/ui/button/ShareButton";
import { getStationInfoData } from "../../../data/station_info";
import { createShare } from "../../../utils/share";

export default function StationShareButton({
  station,
  datetime,
  className,
}: {
  station: number;
  datetime?: number;
  className?: string;
}) {
  const shareStation = useCallback(() => {
    (async () => {
      const [share, data] = await Promise.all([
        createShare({
          type: "station",
          eva: station,
          timestamp: datetime,
        }),
        getStationInfoData(station),
      ]);
      await navigator.share({
        url: share,
        text: `${data.name} auf ${document.location.host}`,
      });
    })();
  }, [datetime, station]);

  return <ShareButton onClick={shareStation} className={className} />;
}
