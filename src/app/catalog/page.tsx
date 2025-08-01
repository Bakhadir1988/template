import { fetchCatalog } from "@/shared/api/catalogApi";
import { generateMetaData } from "@/shared/lib/metadata";
import { CatalogClient } from "./catalog-client";

export async function generateMetadata() {
  const data = await fetchCatalog();

  const { meta } = data;

  return generateMetaData(meta);
}

export default async function Catalog() {
  const data = await fetchCatalog();

  const { items, section, pagi } = data;

  return (
    <CatalogClient
      initialItems={items}
      sectId={section.item_id}
      pagination={pagi}
    />
  );
}
