import React, { useEffect, useState } from "react";
import { getFilter, applyFilter } from "../shared/api";

// Типы для фильтра
interface FilterVariant {
  label: string;
  total_count: string;
  enabled: null | boolean;
  current_count: string;
}

interface FilterProp {
  prop_id: string;
  title: string;
  type: string;
  tpl_key: string;
  unit: string;
  filter_enabled: string;
  valuefield: string;
  variants?: string[];
  value?: null | string;
  filter?: Record<string, FilterVariant>;
  show?: boolean;
}

interface FilterGroup {
  group_id: string;
  tpl_key: string;
  variant: string | number;
  props: Record<string, FilterProp>;
}

interface FilterType {
  type_id: string;
  type_name: string;
  groups: Record<string, FilterGroup>;
}

interface FilterResponse {
  props: FilterType[];
  section: Record<string, unknown>;
  summary: Record<string, unknown>;
}

interface FilterWidgetProps {
  sectId: string;
  onApply?: (selected: Record<string, unknown>) => void;
  onValuesChange?: (selected: Record<string, unknown>) => void;
}

export const FilterWidget: React.FC<FilterWidgetProps> = ({
  sectId,
  onApply,
  onValuesChange,
}) => {
  const [filters, setFilters] = useState<FilterResponse | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getFilter(sectId)
      .then((data: FilterResponse) => {
        setFilters(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки фильтров");
        setLoading(false);
      });
  }, [sectId]);

  // При инициализации фильтров выставляем значения enabled для ENUM и lt/gt для PRICE
  useEffect(() => {
    if (!filters) return;
    const catalogType: FilterType | undefined = filters.props.find(
      (t) => t.type_name !== "Корневой тип"
    );
    if (!catalogType) return;
    const groups: FilterGroup[] = Object.values(catalogType.groups || {});
    const initial: Record<string, unknown> = {};
    for (const group of groups) {
      for (const [propKey, prop] of Object.entries(group.props)) {
        if (prop.filter_enabled !== "1") continue;
        if (prop.type === "ENUM" && prop.filter) {
          const checkedVariants = Object.entries(prop.filter)
            .filter(([, v]) => v.enabled)
            .map(([k]) => k);
          if (checkedVariants.length > 0) {
            initial[propKey] = checkedVariants;
          }
        }
        if (prop.type === "PRICE" && prop.filter) {
          if (prop.filter.gt && prop.filter.gt !== null) {
            initial[`${propKey}_min`] = prop.filter.gt;
          }
          if (prop.filter.lt && prop.filter.lt !== null) {
            initial[`${propKey}_max`] = prop.filter.lt;
          }
        }
      }
    }
    setValues((prev) => ({ ...initial, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Преобразуем значения в массив
  const selectedArray = [
    ...Object.entries(values)
      .filter(([key]) => !key.endsWith("_min") && !key.endsWith("_max"))
      .filter(([, v]) => {
        if (Array.isArray(v)) return v.length > 0;
        return v !== undefined && v !== "" && v !== null;
      })
      .map(([key, v]) => ({ key, value: v })),
    // Добавляем price, если есть min или max
    ...(() => {
      const priceMinKey = Object.keys(values).find((k) => k.endsWith("_min"));
      const priceMaxKey = Object.keys(values).find((k) => k.endsWith("_max"));
      if (!priceMinKey && !priceMaxKey) return [];
      const priceKey = priceMinKey
        ? priceMinKey.replace(/_min$/, "")
        : priceMaxKey
        ? priceMaxKey.replace(/_max$/, "")
        : "";
      if (!priceKey) return [];
      const min = priceMinKey ? values[priceMinKey] : "";
      const max = priceMaxKey ? values[priceMaxKey] : "";
      if (min === "" && max === "") return [];
      return [{ key: priceKey, value: { min, max } }];
    })(),
  ];

  // useEffect должен вызываться всегда
  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(selectedArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedArray)]);

  if (loading) return <div>Загрузка фильтров...</div>;
  if (error) return <div>{error}</div>;
  if (!filters) return null;

  // Пропускаем "Корневой тип"
  const catalogType: FilterType | undefined = filters.props.find(
    (t) => t.type_name !== "Корневой тип"
  );
  if (!catalogType) return <div>Нет фильтров</div>;

  // Собираем все группы с фильтрами
  const groups: FilterGroup[] = Object.values(catalogType.groups || {});

  const handleChange = (propKey: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [propKey]: value }));
  };

  const handleCheckbox = (propKey: string, variant: string) => {
    setValues((prev) => {
      const arr = (prev[propKey] as string[]) || [];
      return {
        ...prev,
        [propKey]: arr.includes(variant)
          ? arr.filter((v: string) => v !== variant)
          : [...arr, variant],
      };
    });
  };

  // Формируем итоговый объект с вложенными группами
  function buildResult(groups: FilterGroup[], values: Record<string, unknown>) {
    const result: Record<string, unknown> = {};
    for (const group of groups) {
      const groupObj: Record<string, unknown> = {};
      for (const [propKey, prop] of Object.entries(group.props)) {
        if (prop.filter_enabled !== "1") continue;
        if (prop.type === "ENUM") {
          const val = values[propKey];
          if (Array.isArray(val) && val.length > 0) {
            groupObj[propKey] = val;
          }
        }
        if (prop.type === "PRICE") {
          const min = values[`${propKey}_min`];
          const max = values[`${propKey}_max`];
          if ((min && min !== "") || (max && max !== "")) {
            groupObj[propKey] = { min, max };
          }
        }
      }
      if (Object.keys(groupObj).length > 0) {
        result[group.tpl_key] = groupObj;
      }
    }
    return result;
  }

  const handleApply = async () => {
    try {
      const result = buildResult(groups, values);
      onApply?.(result);
      await applyFilter(sectId, values); // Можно убрать, если не нужен запрос
    } catch {
      setError("Ошибка применения фильтра");
    }
  };

  console.log("groups", groups);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 320,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleApply();
      }}
    >
      {groups.map((group: FilterGroup) =>
        group.props
          ? Object.entries(group.props).map(
              ([propKey, prop]: [string, FilterProp]) => {
                if (prop.filter_enabled !== "1") return null;
                if (
                  prop.type === "ENUM" &&
                  prop.filter &&
                  Object.keys(prop.filter).length > 0
                ) {
                  return (
                    <div key={propKey} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 500 }}>{prop.title}</div>
                      {Object.entries(prop.filter).map(
                        ([variantKey, variantObj], idx) => (
                          <label
                            key={variantKey + "-" + idx}
                            style={{ display: "block", marginLeft: 8 }}
                          >
                            <input
                              type="checkbox"
                              checked={
                                Array.isArray(values[propKey]) &&
                                (values[propKey] as string[]).includes(
                                  variantKey
                                )
                              }
                              onChange={() =>
                                handleCheckbox(propKey, variantKey)
                              }
                            />{" "}
                            {variantObj.label}
                          </label>
                        )
                      )}
                    </div>
                  );
                }
                if (
                  prop.type === "PRICE" &&
                  prop.filter &&
                  (prop.filter.min !== null ||
                    prop.filter.max !== null ||
                    prop.filter.actual_min !== null ||
                    prop.filter.actual_max !== null ||
                    prop.filter.lt !== null ||
                    prop.filter.gt !== null)
                ) {
                  // Определяем дефолтные значения для min/max
                  const defaultMin =
                    (
                      prop.filter.actual_min ??
                      prop.filter.min ??
                      prop.filter.gt ??
                      ""
                    )?.toString() ?? "";
                  const defaultMax =
                    (
                      prop.filter.actual_max ??
                      prop.filter.max ??
                      prop.filter.lt ??
                      ""
                    )?.toString() ?? "";
                  return (
                    <div key={propKey} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 500 }}>{prop.title}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input
                          type="number"
                          placeholder="Мин."
                          value={
                            (values[`${propKey}_min`] as string) !==
                              undefined &&
                            (values[`${propKey}_min`] as string) !== ""
                              ? (values[`${propKey}_min`] as string)
                              : defaultMin
                          }
                          onChange={(e) =>
                            handleChange(`${propKey}_min`, e.target.value)
                          }
                          style={{ width: 70 }}
                        />
                        <input
                          type="number"
                          placeholder="Макс."
                          value={
                            (values[`${propKey}_max`] as string) !==
                              undefined &&
                            (values[`${propKey}_max`] as string) !== ""
                              ? (values[`${propKey}_max`] as string)
                              : defaultMax
                          }
                          onChange={(e) =>
                            handleChange(`${propKey}_max`, e.target.value)
                          }
                          style={{ width: 70 }}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              }
            )
          : null
      )}
      <button
        type="submit"
        style={{ marginTop: 16, padding: "8px 16px", fontWeight: 600 }}
      >
        Показать
      </button>
    </form>
  );
};
