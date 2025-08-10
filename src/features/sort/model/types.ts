export type SortField = 'alphabet' | 'price' | 'rating';

export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}
