import { appendFilterValuesToFormData } from "@/shared/lib/utils/formDataHelpers";

// Получение фильтров по разделу
export async function getFilter(
  sect_id: string,
  filterValues?: Record<string, unknown>
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL not configured");
  }

  const formData = new FormData();
  formData.append("comp", "filter");
  formData.append("sect_id", sect_id);

  // Добавляем текущие значения фильтра, если они есть
  if (filterValues) {
    appendFilterValuesToFormData(formData, filterValues);
  }

  const res = await fetch(`${apiUrl}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка загрузки фильтров");
  return res.json();
}

// Применение фильтра
export { applyFilter } from "@/shared/api/filterApi";
