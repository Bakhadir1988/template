import axios from "axios";

// Получение фильтров по разделу
export async function getFilter(sect_id: string) {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_FILTER_ID + sect_id,
    { sect_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    }
  );
  if (res.status !== 200) throw new Error("Ошибка загрузки фильтров");
  return res.data;
}

// Применение фильтра
export { applyFilter } from "@/shared/api/filterApi";
