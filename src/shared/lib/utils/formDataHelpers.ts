/**
 * Утилиты для работы с FormData в фильтрах
 */

export function appendFilterValuesToFormData(
  formData: FormData,
  filterValues: Record<string, unknown>
): void {
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
      // Проверяем, является ли это ценовым фильтром (_gt или _lt)
      if (propId.includes("_gt") || propId.includes("_lt")) {
        const basePropId = propId.replace("_gt", "").replace("_lt", "");
        const suffix = propId.includes("_gt") ? "gt" : "lt";
        formData.append(`filter[${basePropId}][${suffix}]`, String(value));
      } else {
        formData.append(`filter[${propId}]`, String(value));
      }
    }
  });
}

export function logFormData(formData: FormData): void {
  for (const [key, value] of formData.entries()) {
    console.log("FormData:", key, value);
  }
}
