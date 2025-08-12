export type SortField = 'title' | 'price';

export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

// Для отображения в UI
export type SortOption =
  | 'title;asc'
  | 'title;desc'
  | 'price;asc'
  | 'price;desc';
