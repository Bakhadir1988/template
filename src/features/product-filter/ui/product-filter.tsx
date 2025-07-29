"use client";

import { FilterItem } from "@/entities/filter-item";
import React, { useEffect, useState } from "react";
import { getFilter } from "../api";
import {
  FilterGroup,
  FilterProp,
  FilterResponse,
  FilterType,
} from "../model/types";

type FilterProps = {
  sectId: string;
};

export const ProductFilter: React.FC<FilterProps> = ({ sectId }) => {
  const [filters, setFilters] = useState<FilterResponse | null>(null);
  const [values, setValues] = useState<FilterGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("filters", filters?.props[1]);

  // Получаем данные по id раздела
  useEffect(() => {
    setLoading(true);
    getFilter(sectId)
      .then((data) => {
        setFilters(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки фильтров");
        setLoading(false);
      });
  }, [sectId]);

  // Фильтруем объекты по типу __nogroup и chars и записываем все в values
  useEffect(() => {
    if (!filters) return;
    const catalogType: FilterType | undefined = filters?.props[1];

    console.log("catalogType", catalogType);

    if (!catalogType) return;
    const groups = Object.values(catalogType.groups).filter(
      (group) =>
        typeof group === "object" &&
        group !== null &&
        "tpl_key" in group &&
        (group.tpl_key === "__nogroup" || group.tpl_key === "chars")
    );
    setValues(groups); // Убери spread оператор
  }, [filters]);

  if (loading) return <div>Загрузка фильтров...</div>;
  if (error) return <div>{error}</div>;
  if (!filters) return null;

  return (
    <form>
      {values?.map((group: FilterGroup) => (
        <div key={group.group_id}>
          {Object.entries(group.props).map(([key, item]) => (
            <div key={key}>{/* {console.log("item", item)} */}</div>
          ))}
        </div>
      ))}

      <FilterItem
        type="checkbox"
        label="Категория"
        options={["Электроника", "Одежда", "Книги"]}
        value={"11"}
      />

      <FilterItem type="range" label="Цена" value={"11"} min={0} max={1000} />

      <FilterItem
        type="checkbox"
        label="Бренд"
        options={["Apple", "Samsung", "Nike"]}
        value={"11"}
      />
    </form>
  );
};
