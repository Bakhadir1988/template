// Получение фильтров по разделу
export async function getFilter(sect_id: string) {
  const res = await fetch(
    `https://litra-adm.workup.spb.ru/api/?comp=filter&sect_id=${sect_id}`
  );
  if (!res.ok) throw new Error("Ошибка загрузки фильтров");
  return res.json();
}

// Применение фильтра: отправка выбранных значений
// export async function applyFilter(
//   sect_id: string,
//   filterValues: Record<string, any>
// ) {
//   const params = new URLSearchParams({
//     comp: "filter",
//     sect_id,
//     ...filterValues,
//   });
//   const res = await fetch(
//     `https://litra-adm.workup.spb.ru/api/?${params.toString()}`
//   );
//   if (!res.ok) throw new Error("Ошибка применения фильтра");
//   return res.json();
// }
