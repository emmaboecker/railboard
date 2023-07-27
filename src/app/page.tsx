import { Metadata } from "next";
import HomePageComponent from "./HomePage";

export const metadata: Metadata = {
  title: "Railboard",
  description:
    "Railboard ist eine Web-App, mit der Du Informationen wie Verspätungen, Gleis(-wechsel) deiner Züge einfach einsehen kannst.",
  openGraph: {
    type: "website",
    title: "Railboard",
    description:
      "Railboard ist eine Web-App, mit der Du Informationen wie Verspätungen, Gleis(-wechsel) deiner Züge einfach einsehen kannst.",
    siteName: "Railboard",
  },
};

export default function HomePage() {
  return <HomePageComponent />;
}
