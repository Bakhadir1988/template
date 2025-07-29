export type ProductChars = {
  class: string | null;
  type: string | null;
  vendor: string | null;
  density: string | null;
  alcohol: string | null;
  test_string: string | null;
};

export type Product = {
  item_id: string;
  title: string;
  price: string;
  chars: ProductChars;
  imgs: string[];
};
