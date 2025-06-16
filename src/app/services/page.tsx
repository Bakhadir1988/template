import { Metadata } from "next";
import { getData } from "@/shared/api/query";
import { MetaData, generateMetaData } from "@/shared/lib/metadata";
import { ServicesClient } from "./ServicesClient";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = (await getData("services")) as { meta: MetaData };
  return generateMetaData(meta);
}

export default async function ServicesPage() {
  const { meta, items } = await getData("services");

  return (
    <main>
      <div className="container">
        <h1>{meta?.h1 || "Наши услуги"}</h1>
        <ServicesClient initialServices={items} />
      </div>
    </main>
  );
}
