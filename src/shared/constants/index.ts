export const API_ENDPOINTS = {
  CATALOG: process.env.NEXT_PUBLIC_API_URL || '',
  FILTER: process.env.NEXT_PUBLIC_FILTER_ID || '',
} as const;

export const DEBOUNCE_DELAY = 400;

export const SORT_OPTIONS = {
  TITLE_ASC: 'title;asc',
  TITLE_DESC: 'title;desc',
  PRICE_ASC: 'price;asc',
  PRICE_DESC: 'price;desc',
} as const;
