"use client";

import { useRouter } from "next/navigation";
import { Reload } from "tabler-icons-react";
import Button from "../../../components/ui/button/Button";

export default function ReloadButton(props: {stationId: string, className: string}) {
  const router = useRouter();

  return (
    <Button
      className={props.className}
      onClick={() => {
        const date = new Date()
        router.replace(`/station/${props.stationId}/${date.getTime()}`)
      }}
    >
      <div className={"flex flex-row gap-2 align-middle"}>
        <Reload size={20} className={"m-auto"} />
        <div className={"m-auto hidden sm:block"}>Aktualisieren</div>
      </div>
    </Button>
  );
}