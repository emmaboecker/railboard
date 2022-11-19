import { PageTitle } from "../components/ui/PageTitle";

export default function TripSearchPanel() {
  return (
    <>
      <div className={"flex w-screen flex-col justify-center align-middle"}>
        <div className={"m-auto"}>
          <PageTitle title="Trip Search" />
        </div>
        <div className="h-10" />
        <h1 className="m-auto text-3xl">Coming soon</h1>
      </div>
    </>
  );
}
