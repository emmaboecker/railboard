"use client";

import { useRouter } from "next/navigation";
import { Reload } from "tabler-icons-react";

export default function ReloadButton(props: {stationId: string, className: string}) {
  const router = useRouter();

  return (
    <button
      className={`bg-violet-600/50 p-2.5 rounded-md ${props.className}`}
      onClick={() => {
        const date = new Date()
        router.push(`/station/${props.stationId}/${date.getTime()}`)
      }}
    >
      <div className={"flex flex-row gap-2 align-middle"}>
        <Reload size={22} className={"m-auto"} />
        <div className={"m-auto hidden sm:block"}>Reload</div>
      </div>
    </button>
  );
}