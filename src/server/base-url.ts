export function getBaseUrl(
  includeProtocol = true,
  host: string | undefined = undefined
): string {
  if (process.env.NODE_ENV === "production") {
    return `${includeProtocol ? "https://" : ""}${
      host ?? process.env.VERCEL_URL
    }`;
  } else {
    return `${includeProtocol ? "http://" : ""}localhost:${
      process.env.PORT || 3000
    }`;
  }
}
