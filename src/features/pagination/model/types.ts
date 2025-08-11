export type Pagination = {
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
