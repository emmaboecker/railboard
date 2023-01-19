"use client";

import { useCallback } from "react";
import ShareButton from "../../../components/ui/button/ShareButton";
import { createShare } from "../../../utils/share";
import { JourneyDetailsVendoResponse } from "../../../requests/vendo/journeyDetails";

export default function JourneyShareButton({
  journeyId,
  className,
  journey,
}: {
  journeyId: string;
  className?: string;
  journey: JourneyDetailsVendoResponse;
}) {
  const shareJourney = useCallback(() => {
    (async () => {
      const share = await createShare({
        type: "journey",
        journeyId,
      });
      await navigator.share({
        url: share,
        text: `${journey.name} auf ${document.location.host}`,
      });
    })();
  }, [journey.name, journeyId]);

  return <ShareButton onClick={shareJourney} className={className} />;
}
