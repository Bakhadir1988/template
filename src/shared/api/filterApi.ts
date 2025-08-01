// Применение фильтра: отправка выбранных значений
export async function applyFilter(
  sect_id: string,
  filterValues: Record<string, unknown>
) {
  const formData = new FormData();

  // Добавляем обязательные поля
  formData.append("comp", "catblock");
  formData.append("sect_id", sect_id);

  // Добавляем фильтры, убираем [chars] и правильно обрабатываем объекты
  Object.entries(filterValues).forEach(([propId, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`filter[${propId}][${index}]`, String(item));
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
        formData.append(`filter[${propId}][${key}]`, String(val));
      });
    } else {
      formData.append(`filter[${propId}]`, String(value));
    }
  });

  const res = await fetch("https://litra-adm.workup.spb.ru/api/", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка применения фильтра");
  return res.json();
}
