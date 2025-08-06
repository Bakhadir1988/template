export type CatalogType = {
  meta: CatalogMeta;
  items: CatalogItem[];
  pagi: CatalogPagination;
  section: CatalogSection;
  sections: CatalogSection[];
  lower_tags: CatalogSection[];
  upper_tags: CatalogSection[];
};

export type CatalogMeta = {
  short_title: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  robots: string | null;
  h1: string;
};

export type CatalogItem = {
  chars: CatalogItemChars;
  item_id: string;
  title: string;
  rating: number | null;
  price: string;
  imgs: string[];
  content: string | null;
  url: string;
};

export type CatalogItemChars = {
  class: string;
  type: string;
  vendor: string;
  density: string;
  alcohol: string;
  test_string: string;
};

export type CatalogPagination = {
  total_items: string;
  items_per_page: string;
  total_pages: number;
  current_page: number;
  from: number;
  to: number;
  window_size: number;
  window_first_page: number;
  window_last_page: number;
  pages: number[];
};

export type CatalogSection = {
  imgs: string[];
  item_id: string;
  manual_url: string;
  title: string;
  url: string;
  faq: CatalogSectionFaq[];
  __path: CatalogSectionPath[];
  sections: CatalogSectionSubsection[];
};

export type CatalogSectionSubsection = {
  item_id: string;
  title: string;
  faq: CatalogSectionFaq[];
  url: string;
  imgs: string[];
  __path: CatalogSectionPath[];
};

export type CatalogSectionFaq = {
  item_id: string;
  title: string;
  answer: string;
};

export type CatalogSectionPath = {
  item_id: string;
  title: string;
  url: string;
};

export type CatalogSections = {
  sections: CatalogSection[];
};
