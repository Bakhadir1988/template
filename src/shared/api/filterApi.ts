import { appendFilterValuesToFormData } from "@/shared/lib/utils/formDataHelpers";

// Применение фильтра: отправка выбранных значений
export async function applyFilter(
  sect_id: string,
  filterValues: Record<string, unknown>
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL not configured");
  }

  const formData = new FormData();

  // Добавляем обязательные поля
  formData.append("comp", "catblock");
  formData.append("sect_id", sect_id);

  // Добавляем фильтры используя утилиту
  appendFilterValuesToFormData(formData, filterValues);

  const res = await fetch(`${apiUrl}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка применения фильтра");
  return res.json();
}
