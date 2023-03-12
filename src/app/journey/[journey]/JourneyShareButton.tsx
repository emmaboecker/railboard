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
  const names = journey.stops.map(
    (stop) => stop.transport.category + " " + (stop.transport.line ?? stop.transport.number.toString())
  );

  const uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });

  const shareJourney = useCallback(() => {
    (async () => {
      const share = await createShare({
        type: "journey",
        journeyId,
      });
      await navigator.share({
        url: share,
        text: `${uniqueNames.join(", ")} auf ${document.location.host}`,
      });
    })();
  }, [journeyId, uniqueNames]);

  return <ShareButton onClick={shareJourney} className={className} />;
}
