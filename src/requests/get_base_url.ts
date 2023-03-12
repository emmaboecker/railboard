export function getApiBaseUrl() {
  const env = process.env.API_BASE_URL;
  if (env) {
    return env;
  }

  return "https://api.rail.stckoverflw.net";
}
