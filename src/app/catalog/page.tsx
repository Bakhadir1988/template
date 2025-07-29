import { fetchCatalog } from "@/shared/api/catalogApi";
import { generateMetaData } from "@/shared/lib/metadata";
import { CatalogListWidget, FilterWidget } from "@/widgets";

export async function generateMetadata() {
  const data = await fetchCatalog();

  const { meta } = data;

  return generateMetaData(meta);
}

export default async function Catalog() {
  const data = await fetchCatalog();

  const { items, section } = data;

  return (
    <div className="container">
      <h1>Каталог</h1>
      <FilterWidget sectId={section.item_id} />
      <CatalogListWidget items={items} />
    </div>
  );
}
