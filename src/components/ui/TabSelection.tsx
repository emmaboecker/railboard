import { Tab } from "@headlessui/react";
import clsx from "clsx";

export function TabSelection(props: {
  selection: string;
  icon: JSX.Element;
  disabled?: boolean;
}) {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          "w-full rounded-t-lg py-2.5 text-sm font-medium leading-5 transition-all",
          "ring-white focus:outline-none",
          selected && "bg-violet-700"
        )
      }
      disabled={props.disabled ?? false}
    >
      <div className="flex flex-row justify-center align-middle text-white">
        <div className="flex flex-col justify-center align-middle">
          <div className="flex justify-center align-middle">{props.icon}</div>
          {props.selection}
        </div>
      </div>
    </Tab>
  );
}
