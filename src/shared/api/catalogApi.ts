import axios from "axios";

export type JsonLdBreadcrumbs = {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    item: {
      "@id": string;
      name: string;
    };
  }>;
};

export type CatalogSectionDto = {
  items: CatalogItem[];
  meta: CatalogMeta;
  section: {
    item_id: string;
  };
};

export type CatalogMeta = {
  short_title: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  robots: string | null;
  h1: string;
  json_ld_breadcrumbs: JsonLdBreadcrumbs;
};

export type CatalogItem = {
  item_id: string;
  title: string;
  price: string;
  imgs: string | string[];
  chars: {
    class: string | null;
    type: string | null;
    vendor: string | null;
    density: string | null;
    alcohol: string | null;
    test_string: string | null;
  };
};

export async function fetchCatalog(): Promise<CatalogSectionDto> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}catalog/`, {
    validateStatus: () => true,
  });
  if (res.status !== 200) throw new Error("Ошибка получения данных");
  return res.data;
}
