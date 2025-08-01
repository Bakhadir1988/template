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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL not configured");
  }

  console.log("Fetching catalog from:", `${apiUrl}catalog/`);
  const response = await fetch(`https://litra-adm.workup.spb.ru/api/catalog/`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
  });
  if (!response.ok) throw new Error("Ошибка получения данных");
  const data = await response.json();
  console.log("Catalog response items count:", data.items?.length || 0);
  return data;
}
