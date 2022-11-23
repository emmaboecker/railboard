"use client";

import { useCallback } from "react";
import ShareButton from "../../../components/ui/button/ShareButton";
import { JourneyDetails } from "../../../requests/vendo/journeyDetails";
import { getBaseUrl } from "../../../server/base-url";
import { createShare } from "../../../utils/share";

export default function JourneyShareButton({
  journeyId,
  className,
  journey,
}: {
  journeyId: string;
  className?: string;
  journey: JourneyDetails;
}) {
  const shareJourney = useCallback(() => {
    (async () => {
      const share = await createShare({
        type: "journey",
        journeyId,
      });
      await navigator.share({
        url: share,
        text: `${journey.normalName} auf ${document.location.host}`,
      });
    })();
  }, [journey.normalName, journeyId]);

  return <ShareButton onClick={shareJourney} className={className} />;
}
