import { Metadata } from 'next';

import { getCatalog } from '@/shared/api/catalogApi';
import { CatalogPageView } from '@/views';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCatalog('catalog');

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

export default async function CatalogPage() {
  const data = await getCatalog('catalog');

  if (!data) {
    return null;
  }

  const { items, pagi, section, sections } = data;

  return (
    <CatalogPageView
      items={items}
      pagi={pagi}
      sections={sections}
      section={section}
    />
  );
}
