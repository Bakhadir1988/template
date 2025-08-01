"use client";

import React, { useEffect } from "react";
import { applyFilter } from "@/shared/api/filterApi";
import { FilterType, FilterGroup } from "../model/types";
import { buildFilterPayload } from "../lib/buildFilterPayload";
import { useFilters } from "../lib/useFilters";
import { FilterRenderer } from "./filter-renderer";
import styles from "./product-filter.module.scss";

interface ProductFilterProps {
  sectId: string;
  onFilterApplied?: (filteredData: unknown) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  sectId,
  onFilterApplied,
}) => {
  const {
    filters,
    values,
    loading,
    error,
    summary,
    disabledOptions,
    fetchFilters,
    handleFilterChange,
    handleRangeChange,
    handleReset,
  } = useFilters(sectId);

  useEffect(() => {
    fetchFilters({}, true);
  }, [fetchFilters]);

  if (loading) return <div>Загрузка фильтров...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!filters) return null;

  const catalogType: FilterType | undefined = filters?.props.find(
    (t: FilterType) => t.type_name !== "Корневой тип"
  );
  if (!catalogType) return null;
  const groups: FilterGroup[] = Object.values(catalogType.groups || {});

  const handleApplyFilter = async () => {
    if (filters) {
      try {
        const payload = buildFilterPayload(filters, values);
        const result = await applyFilter(sectId, payload);

        if (onFilterApplied) {
          onFilterApplied(result);
        }
      } catch (error) {
        console.error("Error applying filter:", error);
      }
    }
  };

  const handleResetWithItems = async () => {
    await handleReset();

    // Применяем сброшенные фильтры для обновления списка товаров
    try {
      const result = await applyFilter(sectId, {});

      if (onFilterApplied) {
        onFilterApplied(result);
      }
    } catch (error) {
      console.error("Error applying reset:", error);
    }
  };

  console.log("group", groups);

  return (
    <form className={styles["product-filter"]}>
      <div className={styles["product-filter__row"]}>
        {groups.map((group) => (
          <FilterRenderer
            key={group.group_id}
            group={group}
            values={values}
            onFilterChange={handleFilterChange}
            onRangeChange={handleRangeChange}
            disabledOptions={disabledOptions}
          />
        ))}
      </div>
      <div className={styles["product-filter__buttons"]}>
        <button
          type="button"
          className={styles["product-filter__submit"]}
          onClick={handleApplyFilter}
        >
          {summary?.found !== undefined
            ? `Показать ${summary.found} товаров`
            : "Применить фильтр"}
        </button>
        <button
          type="button"
          className={styles["product-filter__reset"]}
          onClick={handleResetWithItems}
        >
          Сбросить
        </button>
      </div>
    </form>
  );
};
