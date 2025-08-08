export type ProductType = {
  chars: ProductChars;
  sections_objects: ProductSection;
  item_id: string;
  __path: ProductSectionObject[];
  type_id: string | null;
  title: string;
  imgs: string[];
  price: string;
  content: string;
  url: string;
};

export type ProductChars = {
  class: string;
  type: string;
  vendor: string;
  density: string;
  alcohol: string;
};

export type ProductSection = {
  faq: [];
  related: [];
};

export type ProductSectionObject = {
  item_id: string;
  url: string;
  title: string;
};
