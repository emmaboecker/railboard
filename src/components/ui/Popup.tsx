import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";

export type PopupProps = {
  children: React.ReactNode;
  onClose?: () => void | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: React.ReactNode;
  className?: string;
};

export default function Popup(props: PopupProps) {
  return (
    <Transition appear show={props.open} as={"div"}>
      <Dialog
        as="div"
        className="relative z-10"
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onClose={props.onClose ?? (() => props.setOpen(false))}
      >
        <Transition.Child
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div className="fixed inset-3 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={"flex w-[90vw] flex-col rounded-lg bg-zinc-800 p-5 text-violet-400 md:w-[70vw] xl:w-[50vw]"}
              >
                <Dialog.Title className={"flex w-full flex-row justify-between text-xl font-bold"}>
                  {props.title}
                  <button
                    className={"rounded-md p-1 transition-all duration-200 hover:bg-zinc-900"}
                    onClick={() => props.setOpen(false)}
                  >
                    <IoCloseOutline color={"white"} size={24} />
                  </button>
                </Dialog.Title>
                <Dialog.Description as={"div"} className={clsx("h-fit w-full gap-4 pt-5 text-white", props.className)}>
                  {props.children}
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
