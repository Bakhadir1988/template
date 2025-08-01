import axios from "axios";

// Получение фильтров по разделу
export async function getFilter(sect_id: string) {
  const res = await axios.post(
    "/api/filter",
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
