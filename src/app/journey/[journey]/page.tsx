import MessageDisplay from "./MessageDisplay";
import GoBackButton from "../../../components/ui/button/GoBackButton";
import JourneyShareButton from "./JourneyShareButton";
import journeyDetails from "../../../requests/ris/journeyDetails";
import StopDisplay from "./StopDisplay";
import { Metadata } from "next";

export const revalidate = 60;

export const dynamic = "force-dynamic";

type Props = { params: { journey: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await journeyDetails(params.journey);

  const names = data.stops.map(
    (stop) => stop.transport.category + " " + (stop.transport.line ?? stop.transport.number.toString())
  );

  const uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return {
    title: `${uniqueNames.join(", ")} - Reise | Railboard`,
    openGraph: {
      type: "website",
      title: `${uniqueNames.join(", ")} auf Railboard`,
      description: `Die aktuelle Reise von ${uniqueNames.join(", ")} auf Railboard.`,
      siteName: "Railboard",
    },
  };
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const data = await journeyDetails(params.journey);

  const names = data.stops.map(
    (stop) => stop.transport.category + " " + (stop.transport.line ?? stop.transport.number.toString())
  );

  const uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });

  const numbers = data.stops.map((stop) => stop.transport.number);

  const uniqueNumbers = numbers.filter((element, index) => {
    return numbers.indexOf(element) === index;
  });

  const admins = data.stops.map((stop) => {
    let adminName;
    if (stop.administration.name !== stop.administration.risName) {
      adminName = stop.administration.name + " (" + stop.administration.risName + ")";
    } else {
      adminName = stop.administration.name;
    }

    if (adminName.includes("Nahverkehrszug") || adminName.includes("Nahreisezug")) {
      adminName = stop.administration.id + ` (${adminName})`;
    }

    return adminName;
  });

  const uniqueAdmins = admins.filter((element, index) => {
    return admins.indexOf(element) === index;
  });

  const isDifferentNumber = data.stops.some((stop) => {
    return stop.transport.line != null && stop.transport.line !== stop.transport.number.toString();
  });

  const commonMessages = data.stops
    .map((stop) => stop.messages.map((message) => message))
    .reduce((a, b) => a.filter((c) => b.map((m) => m.text).includes(c.text)));

  return (
    <>
      <div className={"h-screen text-white"}>
        <div className={"fixed z-10 flex h-14 w-full justify-between border-b-4 border-b-zinc-700 bg-zinc-800"}>
          <div className={"text-md my-auto ml-3 mr-1 flex flex-row gap-1 truncate font-semibold sm:gap-2 sm:text-lg"}>
            <GoBackButton />
            <div className={"my-auto "}>{uniqueNames.join(", ")}</div>
            <div className={"my-auto text-sm uppercase text-zinc-400"}>nach</div>
            <div className={"my-auto truncate"}>{data.destinationName}</div>
          </div>
          <JourneyShareButton journey={data} journeyId={params.journey} className="my-auto mr-2 text-sm" />
        </div>
        <div className={"flex w-full pt-14 align-middle"}>
          <div className={"flex flex-col gap-0 p-2 text-lg font-bold text-zinc-400 sm:m-auto sm:flex-row sm:gap-1"}>
            <span className={"text-white"}>
              {uniqueNames.join(", ")} {isDifferentNumber && <>({uniqueNumbers.join(", ")})</>}
            </span>
            <>
              betrieben durch
              <span className={"text-white"}>{uniqueAdmins.join(", ")}</span>
            </>
          </div>
        </div>
        <div className={"mb-5 flex w-full flex-col gap-1 p-2"}>
          {commonMessages
            .sort((a, b) => (a.displayPriority ?? 0) - (b.displayPriority ?? b.type === "CUSTOMER_TEXT" ? 1 : 0))
            .map((message) => (
              <MessageDisplay
                text={message.text}
                color={message.type === "CUSTOMER_TEXT" ? "gray" : "red"}
                key={message.text}
                showIcon
              />
            ))}
        </div>
        <div className={"relative h-screen w-full"}>
          {data.stops.map((stop, index) => {
            return (
              <StopDisplay
                stop={stop}
                commonMessages={commonMessages.map((message) => message.text)}
                stops={data.stops}
                index={index}
                key={stop.stopName}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
