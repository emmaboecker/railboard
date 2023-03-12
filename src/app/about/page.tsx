import Link from "next/link";
import GoBackButton from "../../components/ui/button/GoBackButton";

export default function AboutPage() {
  return (
    <div className={"flex sm:justify-center"}>
      <div className={"mx-auto flex w-[100vw] flex-col gap-5 p-5 text-white sm:w-[70vw] xl:w-[50vw]"}>
        <header className={"flex flex-row gap-2 text-3xl font-semibold sm:text-4xl"}>
          <GoBackButton />
          <h1>Über Railboard</h1>
        </header>
        <p className={"text-xl text-zinc-300"}>
          Entwickelt von <ExternalLink link={"https://twitter.com/StckOverflw"} text={"@StckOverflw"} />
          /
          <ExternalLink link={"https://chaos.social/@stck"} text={"@stck@chaos.social"} />
        </p>
        <p className={"w-full break-words"}>
          Railboard ist eine Website (und PWA) um möglichst einfach Informationen über Züge, ihre Verspätung, ihre
          Wagenreihung (Coming soon&trade;) usw. zu erhalten. <br />
          Sehr inspiriert von
          <ExternalLink link={"https://bahn.expert"} text={"bahn.expert"} />
          wollte ich jedoch eine etwas übersichtlichere und schönere Version machen, außerdem hat mich die neue Bahn-API
          namens
          <ExternalLink
            link={
              "https://www.cloudcomputing-insider.de/die-deutsche-bahn-faehrt-ab-auf-vendo-a-290e5cbb4c9c86ee6c4cf7e8937ab88a/"
            }
            text={"Vendo"}
          />
          die von
          <ExternalLink link={"https://next.bahn.de/"} text={"DB Next"} />
          benutzt wird sehr interessiert, was mir die Motivation gegeben hat, dieses Projekt zu starten. Ich habe jedoch
          mittlerweile gemerkt, dass die API nicht genug Daten/Informationen liefert. <br />
          Mittlerweile baue ich auf einer Kombination von mehreren mehr oder weniger internen APIs auf, die ich
          reverse-engineered habe. <br />
          Die Daten kann man auch in eigenen Projekten benutzen, da ich das Backend ebenfalls Open-Source entwickle und
          eine öffentliche API bereitstelle. Diese ist hier zu finden:{" "}
          <ExternalLink link={"https://github.com/StckOverflw/railboard-api"} text={"StckOverflw/railboard-api"} />
        </p>
        <h2 className={"text-xl font-semibold"}>Bugs & Feature Requests</h2>
        <p>
          Bei eventuell gefundenen Bugs (Typos, Layout Bugs oder anderen Problemen) sowie bei Feature Requests melde
          dich bitte auf Github indem du ein
          <ExternalLink link={"https://github.com/StckOverflw/railboard/issues/new"} text={"neues Issue"} />
          erstellst.
        </p>
        <p className={"text-lg text-zinc-400"}>
          Diese Website steht nicht in Verbindung mit der Deutschen Bahn AG, jeweiligen Tochterunternehmen o.Ä.
        </p>
      </div>
    </div>
  );
}

function ExternalLink(props: { link: string; text: string }) {
  return (
    <>
      {" "}
      <Link
        href={props.link}
        className={"text-violet-500 transition-all duration-200 hover:text-violet-400"}
        target={"_blank"}
      >
        {props.text}
      </Link>{" "}
    </>
  );
}
