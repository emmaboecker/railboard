import journeyDetails from "../../../requests/ris/journeyDetails";

export default async function Head({ params }: { params: { journey: string } }) {
  const data = await journeyDetails(params.journey);

  const names = data.stops.map(
    (stop) => stop.transport.category + " " + (stop.transport.line ?? stop.transport.number.toString())
  );

  const uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });

  return (
    <>
      <title>{`${uniqueNames.join(", ")} - Journey | Railboard`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${uniqueNames.join(", ")} auf Railboard`} />
      <meta property="og:description" content={`Die aktuelle Reise von auf Railboard.`} />
      <meta property="og:site_name" content="Railboard" />
      <meta property="og:url" content="https://rail.stckoverflw.net" />
    </>
  );
}
