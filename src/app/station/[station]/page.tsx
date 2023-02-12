import { redirect } from "next/navigation";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export default function StationBoardPage({ params }: { params: { station: string } }): JSX.Element {
  const date = new Date();

  redirect(`/station/${params.station}/${dayjs(date).toISOString()}`);

  return <></>;
}
