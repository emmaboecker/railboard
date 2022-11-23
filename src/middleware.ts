import { NextRequest, NextResponse } from "next/server";
import { Share } from "./pages/api/share";
import { getBaseUrl } from "./server/base-url";
import { redis } from "./server/redis";

export async function middleware(request: NextRequest) {
  const id = request.nextUrl.pathname.substring(3);
  const share = await redis.get(id);
  const result = Share.safeParse(share);
  if (result.success) {
    let url;
    switch (result.data.type) {
      case "station":
        const timestamp = result.data.timestamp;
        url = `/station/${result.data.eva}/${timestamp || Date.now()}`;
        break;
      case "journey":
        url = `/journey/${encodeURIComponent(result.data.journeyId)}`;
        break;
    }
    const baseUrl = getBaseUrl();
    console.log(`${baseUrl}${url}`);

    return NextResponse.redirect(`${baseUrl}${url}`);
  }
}

export const config = {
  matcher: ["/s/:id/"],
};
