"use client";

import React, { useEffect, useState } from "react";
import { getFilter, applyFilter } from "../api";
import {
  FilterGroup,
  FilterProp,
  FilterResponse,
  FilterType,
} from "../model/types";
import { FilterItem } from "@/entities/filter-item";
import styles from "./product-filter.module.scss";

type FilterValues = Record<string, unknown>;

type ProductFilterProps = {
  sectId: string;
};

export const ProductFilter: React.FC<ProductFilterProps> = ({ sectId }) => {
  const [filters, setFilters] = useState<FilterResponse | null>(null);
  const [values, setValues] = useState<FilterValues>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Инициализация значений фильтров (ENUM и PRICE)
  useEffect(() => {
    if (!filters) return;
    const catalogType: FilterType | undefined = filters.props.find(
      (t) => t.type_name !== "Корневой тип"
    );
    if (!catalogType) return;
    const groups: FilterGroup[] = Object.values(catalogType.groups || {});
    const initial: FilterValues = {};
    for (const group of groups) {
      const propsArr: FilterProp[] = Object.values(group.props || {});
      for (const prop of propsArr) {
        if (prop.filter_enabled !== "1") continue;
        if (prop.type === "ENUM" && prop.filter) {
          const checkedVariants = Object.entries(prop.filter)
            .filter(([, v]) => v.enabled)
            .map(([k]) => k);
          if (checkedVariants.length > 0) {
            initial[prop.prop_id] = checkedVariants;
          }
        }
        if (prop.type === "PRICE" && prop.filter) {
          const filterObj = prop.filter as Record<string, unknown>;
          if (typeof filterObj.gt === "string" && filterObj.gt !== null) {
            initial[`${prop.prop_id}_gt`] = filterObj.gt;
          }
          if (typeof filterObj.lt === "string" && filterObj.lt !== null) {
            initial[`${prop.prop_id}_lt`] = filterObj.lt;
          }
        }
      }
    }
    setValues(initial);
  }, [filters]);

  if (loading) return <div>Загрузка фильтров...</div>;
  if (error) return <div>{error}</div>;
  if (!filters) return null;

  const handleFilterChange = (propId: string, value: unknown) => {
    setValues((prev) => {
      const updated = { ...prev, [propId]: value };
      return updated;
    });
  };

  const handleRangeChange = (propId: string, range: [number, number]) => {
    setValues((prev) => {
      const updated = {
        ...prev,
        [`${propId}_gt`]: range[0],
        [`${propId}_lt`]: range[1],
      };
      return updated;
    });
  };

  // Функция для формирования payload для бэка
  function buildFilterPayload(
    filters: FilterResponse,
    values: Record<string, unknown>
  ) {
    const catalogType = filters.props.find(
      (t) => t.type_name !== "Корневой тип"
    );
    if (!catalogType) return {};

    const groups = Object.values(catalogType.groups || {});
    const result: Record<string, unknown> = {};

    for (const group of groups) {
      const propsArr = Object.values(group.props || {});
      for (const prop of propsArr) {
        if (prop.filter_enabled !== "1") continue;
        if (prop.type === "ENUM" && prop.filter) {
          const val = values[prop.prop_id];
          if (val !== undefined && Array.isArray(val) && val.length > 0) {
            result[prop.prop_id] = val;
          }
        }
        if (prop.type === "PRICE" && prop.filter) {
          const lt = values[`${prop.prop_id}_lt`];
          const gt = values[`${prop.prop_id}_gt`];
          if (lt !== undefined || gt !== undefined) {
            result[prop.prop_id] = {
              lt: lt !== undefined ? lt : "",
              gt: gt !== undefined ? gt : "",
            };
          }
        }
      }
    }
    return result;
  }

  const catalogType: FilterType | undefined = filters.props.find(
    (t) => t.type_name !== "Корневой тип"
  );
  if (!catalogType) return null;
  const groups: FilterGroup[] = Object.values(catalogType.groups || {});

  return (
    <form className={styles["product-filter"]}>
      <div className={styles["product-filter__row"]}>
        {groups.map((group) => {
          const propsArr: FilterProp[] = Object.values(group.props || {});
          return propsArr.map((prop) => {
            if (prop.filter_enabled !== "1") return null;
            if (prop.type === "ENUM" && prop.filter) {
              const options = Object.entries(prop.filter).map(
                ([key, variant]) => ({
                  value: key,
                  label: variant.label,
                })
              );

              return (
                <FilterItem
                  key={prop.prop_id}
                  type="checkbox"
                  label={prop.title}
                  options={options.map((o) => o.label)}
                  value={
                    Array.isArray(values[prop.prop_id])
                      ? (values[prop.prop_id] as string[])
                      : []
                  }
                  onChange={(value) => handleFilterChange(prop.prop_id, value)}
                />
              );
            }
            if (prop.type === "PRICE") {
              const filterObj = prop.filter as Record<string, unknown>;
              const min = filterObj.min;
              const max = filterObj.max;
              const currentRange: [number, number] = [
                values[`${prop.prop_id}_gt`] !== undefined
                  ? Number(values[`${prop.prop_id}_gt`])
                  : Number(min) || 0,
                values[`${prop.prop_id}_lt`] !== undefined
                  ? Number(values[`${prop.prop_id}_lt`])
                  : Number(max) || 100,
              ];

              return (
                <FilterItem
                  key={prop.prop_id}
                  type="range"
                  label={prop.title}
                  min={Number(min) || 0}
                  max={Number(max) || 100}
                  value={currentRange}
                  onChange={(value) =>
                    handleRangeChange(prop.prop_id, value as [number, number])
                  }
                />
              );
            }
            return null;
          });
        })}
      </div>
      <button
        type="button"
        className={styles["product-filter__submit"]}
        onClick={async () => {
          if (filters) {
            try {
              const payload = buildFilterPayload(filters, values);
              console.log("Payload (JSON):", payload);

              const result = await applyFilter(sectId, payload);
              console.log("Filter applied successfully:", result);
            } catch (error) {
              console.error("Error applying filter:", error);
              // Здесь можно показать ошибку пользователю
            }
          }
        }}
      >
        Применить фильтр
      </button>
    </form>
  );
};
