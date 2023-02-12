"use client";

import { useCallback } from "react";
import ShareButton from "../../../components/ui/button/ShareButton";
import { createShare } from "../../../utils/share";
import { RisJourneyDetails } from "../../../requests/ris/journeyDetails";

export default function JourneyShareButton({
  journeyId,
  className,
  journey,
}: {
  journeyId: string;
  className?: string;
  journey: RisJourneyDetails;
}) {
  const shareJourney = useCallback(() => {
    (async () => {
      const share = await createShare({
        type: "journey",
        journeyId,
      });
      await navigator.share({
        url: share,
        text: ` auf ${document.location.host}`,
      });
    })();
  }, [journeyId]);

  return <ShareButton onClick={shareJourney} className={className} />;
}
