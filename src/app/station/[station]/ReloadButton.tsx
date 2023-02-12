"use client";

import { usePathname, useRouter } from "next/navigation";
import { Reload } from "tabler-icons-react";
import Button from "../../../components/ui/button/Button";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function ReloadButton(props: { stationId: number; className: string }) {
  const router = useRouter();

  const [reloading, setReloading] = useState(false);

  const path = usePathname();

  useEffect(() => {
    setReloading(false);
  }, [path]);

  return (
    <Button
      className={props.className}
      onClick={() => {
        setReloading(true);
        const date = new Date();
        router.replace(`/station/${props.stationId}/${dayjs(date).format()}`);
      }}
      disabled={reloading}
    >
      <div className={"flex flex-row gap-2 align-middle"}>
        {!reloading && <Reload size={20} className={"m-auto"} />}
        {reloading && (
          <TailSpin
            width={20}
            height={20}
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        <div className={"m-auto hidden sm:block"}>Aktualisieren</div>
      </div>
    </Button>
  );
}
