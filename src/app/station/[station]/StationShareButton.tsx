"use client";

import { ReactNode, useCallback } from "react";
import ShareButton from "../../../components/ui/button/ShareButton";
import { stationInformation } from "../../../requests/ris/stationInformation";
import { createShare } from "../../../utils/share";

export default function StationShareButton({
  station,
  datetime,
  className,
  size,
  children,
}: {
  station: string;
  datetime?: number;
  className?: string;
  size?: number;
  children?: ReactNode;
}) {
  const shareStation = useCallback(() => {
    (async () => {
      const [share, data] = await Promise.all([
        createShare({
          type: "station",
          eva: station,
          timestamp: datetime,
        }),
        stationInformation(station),
      ]);
      await navigator.share({
        url: share,
        text: `${data.names.nameLong} auf ${document.location.host}`,
      });
    })();
  }, [datetime, station]);

  return <ShareButton onClick={shareStation} className={className} size={size}>{children}</ShareButton>;
}
