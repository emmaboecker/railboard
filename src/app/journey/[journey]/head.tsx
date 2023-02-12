import journeyDetails from "../../../requests/ris/journeyDetails";

export default async function Head({ params }: { params: { journey: string } }) {
  const data = await journeyDetails(params.journey);

  // TODO: danidwabhfa

  return (
    <>
      <title>{`Journey | Railboard`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={` auf Railboard`} />
      <meta property="og:description" content={`Die aktuelle Reise von auf Railboard.`} />
      <meta property="og:site_name" content="Railboard" />
      <meta property="og:url" content="https://rail.stckoverflw.net" />
    </>
  );
}
