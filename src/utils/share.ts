import { z } from "zod";
import { Share } from "../pages/api/share";

type ShareData = z.infer<typeof Share>;

export async function createShare(share: ShareData): Promise<string> {
  const response = await fetch("/api/share", {
    method: "POST",
    body: JSON.stringify(share),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw "Failed to create a share link.";
  }
  const json = await response.json();
  return json.url;
}
