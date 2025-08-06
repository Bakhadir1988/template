import { getCatalog } from '@/shared/api/catalogApi';
import { CatalogWidget } from '@/widgets';

interface CatalogSectionPageProps {
  params: Promise<{
    slug?: string | string[];
  }>;
}

export default async function CatalogSectionPage({
  params,
}: CatalogSectionPageProps) {
  const { slug } = await params;

  const currentSlug = Array.isArray(slug) ? slug.join('/') : slug;

  try {
    const data = await getCatalog(`catalog/${currentSlug}`);

    if (!data) {
      return <div>Данные не найдены</div>;
    }

    console.log('data', data);

    const { items, pagi, section, sections, lower_tags, upper_tags } = data;

    return (
      <CatalogWidget
        items={items}
        pagi={pagi}
        section={section}
        sections={sections}
        lowerTags={lower_tags}
        upperTags={upper_tags}
      />
    );
  } catch (error) {
    console.error('Ошибка загрузки каталога:', error);
    return <div>Ошибка загрузки каталога</div>;
  }
}
