import { CatalogItem } from "@/shared/api/catalogApi";

/**
 * Извлекает массив товаров из различных структур API ответов
 */
export function extractItemsFromResponse(
  response: unknown
): CatalogItem[] | null {
  if (!response || typeof response !== "object") {
    return null;
  }

  const data = response as Record<string, unknown>;

  // Проверяем различные возможные структуры ответа
  const possiblePaths = [
    // 1. items на верхнем уровне
    () => data.items,
    // 2. items внутри data
    () =>
      data.data &&
      typeof data.data === "object" &&
      (data.data as Record<string, unknown>).items,
    // 3. items внутри result
    () =>
      data.result &&
      typeof data.result === "object" &&
      (data.result as Record<string, unknown>).items,
  ];

  for (const getItems of possiblePaths) {
    const items = getItems();
    if (Array.isArray(items)) {
      return items as CatalogItem[];
    }
  }

  return null;
}
