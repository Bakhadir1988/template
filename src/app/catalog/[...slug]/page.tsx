import { Metadata } from 'next';

import { getCatalog } from '@/shared/api/catalogApi';
import { CatalogPageView } from '@/views';

interface CatalogSectionPageProps {
  params: Promise<{
    slug?: string | string[];
  }>;
}

export async function generateMetadata({
  params,
}: CatalogSectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const data = await getCatalog(`catalog/${currentSlug}`);

  if (!data) {
    return {
      title: 'Каталог',
      description: 'Каталог товаров',
    };
  }

  const { meta } = data;

  return {
    title: meta.seo_title,
    description: meta.seo_description,
    keywords: meta.seo_keywords,
    robots: meta.robots || 'index, follow',
    openGraph: {
      title: meta.seo_title,
      description: meta.seo_description,
      type: 'website',
    },
  };
}

export default async function CatalogSectionPage({
  params,
}: CatalogSectionPageProps) {
  const { slug } = await params;
  const currentSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const data = await getCatalog(`catalog/${currentSlug}`);

  if (!data) {
    return <div>Данные не найдены</div>;
  }

  const { items, pagi, section, sections, lower_tags, upper_tags } = data;

  // Если items - массив, показываем каталог
  if (Array.isArray(items)) {
    return (
      <CatalogPageView
        items={items}
        pagi={pagi}
        section={section}
        sections={sections}
        lowerTags={lower_tags}
        upperTags={upper_tags}
      />
    );
  }

  // Иначе показываем товар
  // return <ProductDetailPageView data={data} />;
  return <div>test</div>;
}
