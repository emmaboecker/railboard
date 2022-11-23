export function getBaseUrl(includeProtocol = true): string {
  if (process.env.NODE_ENV === "production") {
    return `${includeProtocol ? "https://" : ""}${process.env.VERCEL_URL}`;
  } else {
    return `${includeProtocol ? "http://" : ""}localhost:${
      process.env.PORT || 3000
    }`;
  }
}
