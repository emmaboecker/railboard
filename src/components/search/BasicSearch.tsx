import { ChangeEventHandler, Dispatch, Fragment, SetStateAction } from "react";
import { useClickOutside, useDebouncedValue } from "@mantine/hooks";
import useSWR, { Fetcher, Key } from "swr";
import { Transition } from "@headlessui/react";

type BasicSearchProps<Data, SWRKey extends Key> = {
  placeholder: string;
  renderer: (value: Data) => JSX.Element;
  alwaysPresentData?: JSX.Element;

  onChange?: ChangeEventHandler<HTMLInputElement>;
  data: Fetcher<Array<Data>, SWRKey> | null;
  searchState: [string, Dispatch<SetStateAction<string>>];
  open: [boolean, Dispatch<SetStateAction<boolean>>];
};

export default function BasicSearch<T, SWRKey extends Key>(props: BasicSearchProps<T, SWRKey>): JSX.Element {
  const [search, setSearch] = props.searchState;
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const [open, setOpen] = props.open;
  const ref = useClickOutside(() => setOpen(false));

  const { data } = useSWR(debouncedSearch, props.data);

  return (
    <div className="relative w-full">
      <input
        className=" w-full rounded-md bg-zinc-800 p-2 text-white outline-none"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
          props.onChange?.(e);
        }}
        onClick={() => {
          setOpen(true);
        }}
        value={search}
        placeholder={props.placeholder}
      />
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        {typeof props.alwaysPresentData !== "undefined" || search !== "" ? (
          <div
            className={"absolute z-30 m-auto mt-2 flex max-h-[50vh] w-full rounded-md bg-zinc-800 p-2 text-white"}
            ref={ref}
          >
            {search == "" ? (
              props.alwaysPresentData
            ) : (
              <>
                {!data ? (
                  <div className="flex w-full justify-center align-middle">
                    <p>Lädt...</p>
                  </div>
                ) : (
                  <div className="flex w-full flex-col overflow-y-auto">
                    {data.map((element) => props.renderer(element))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div />
        )}
      </Transition>
    </div>
  );
}
