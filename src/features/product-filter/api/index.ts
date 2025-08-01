import { appendFilterValuesToFormData } from "@/shared/lib/utils/formDataHelpers";

// Получение фильтров по разделу
export async function getFilter(
  sect_id: string,
  filterValues?: Record<string, unknown>
) {
  console.log("getFilter called:", { sect_id, filterValues });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL not configured");
  }

  const formData = new FormData();
  formData.append("comp", "filter");
  formData.append("sect_id", sect_id);

  if (filterValues) {
    appendFilterValuesToFormData(formData, filterValues);
  }

  const startTime = Date.now();

  const res = await fetch(`${apiUrl}`, {
    method: "POST",
    body: formData,
  });

  const endTime = Date.now();
  console.log(
    `Fetch request completed in ${endTime - startTime}ms, status:`,
    res.status
  );

  if (!res.ok) throw new Error("Ошибка загрузки фильтров");
  return res.json();
}

// Применение фильтра
export { applyFilter } from "@/shared/api/filterApi";
