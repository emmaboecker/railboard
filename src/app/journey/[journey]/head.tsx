import journeyDetails from "../../../requests/vendo/journeyDetails";

export default async function Head({
  params,
}: {
  params: { journey: string };
}) {
  const data = await journeyDetails(params.journey);
  return (
    <>
      <title>{`${data.normalName} - Journey | Railboard`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${data.normalName} auf Railboard`} />
      <meta
        property="og:description"
        content={`Die aktuelle Reise des ${data.normalName} auf Railboard.`}
      />
      <meta property="og:site_name" content="Railboard" />
      <meta property="og:url" content="https://rail.stckoverflw.net" />
    </>
  );
}
