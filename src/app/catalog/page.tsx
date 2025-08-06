import { getCatalog } from '@/shared/api/catalogApi';
import { CatalogWidget } from '@/widgets';

export default async function CatalogPage() {
  const data = await getCatalog('catalog');

  if (!data) {
    return null;
  }

  const { items, pagi, section, sections } = data;

  return (
    <CatalogWidget
      items={items}
      pagi={pagi}
      sections={sections}
      section={section}
    />
  );
}
