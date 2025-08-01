import { useState, useCallback, useRef, useEffect } from "react";
import { getFilter } from "../api";
import { FilterResponse, FilterValues } from "../model/types";

interface UseFiltersReturn {
  filters: FilterResponse | null;
  values: FilterValues;
  loading: boolean;
  error: string | null;
  summary: { found: number } | null;
  disabledOptions: Record<string, number[]>; // Добавляем disabledOptions
  setValues: (values: FilterValues) => void;
  fetchFilters: (
    filterValues?: FilterValues,
    showLoading?: boolean
  ) => Promise<void>;
  handleFilterChange: (propId: string, value: unknown) => void;
  handleRangeChange: (propId: string, range: [number, number]) => void;
  handleReset: () => Promise<void>;
}

export function useFilters(sectId: string): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterResponse | null>(null);
  const [values, setValues] = useState<FilterValues>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{ found: number } | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<
    Record<string, number[]>
  >({});
  const rangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup для таймаута при размонтировании
  useEffect(() => {
    return () => {
      if (rangeTimeoutRef.current) {
        clearTimeout(rangeTimeoutRef.current);
      }
    };
  }, []);

  // Функция для вычисления disabledOptions из фильтров
  const calculateDisabledOptions = useCallback((filterData: FilterResponse) => {
    const result: Record<string, number[]> = {};

    const catalogType = filterData.props.find(
      (t) => t.type_name !== "Корневой тип"
    );
    if (!catalogType) return result;

    const groups = Object.values(catalogType.groups || {});

    for (const group of groups) {
      const propsArr = Object.values(group.props || {});
      for (const prop of propsArr) {
        if (prop.filter_enabled !== "1" || prop.type !== "ENUM" || !prop.filter)
          continue;

        const options = Object.entries(prop.filter).map(
          ([key, variant], index) => ({
            value: key,
            label: variant.label,
            count: parseInt(variant.current_count) || 0,
            enabled:
              variant.current_count !== undefined &&
              parseInt(variant.current_count) > 0, // Проверяем наличие current_count
            index,
          })
        );

        const disabledIndices = options
          .map((o) => (!o.enabled ? o.index : -1))
          .filter((i) => i !== -1);

        if (disabledIndices.length > 0) {
          result[prop.prop_id] = disabledIndices;
        }

        // Отладочная информация
        console.log(`Calculating disabled for ${prop.title}:`, {
          propId: prop.prop_id,
          options: options.map((o) => ({
            label: o.label,
            count: o.count,
            enabled: o.enabled,
            index: o.index,
          })),
          disabledIndices,
          result: result[prop.prop_id],
        });
      }
    }

    return result;
  }, []);

  const fetchFilters = useCallback(
    async (filterValues: FilterValues = {}, showLoading = false) => {
      console.log("fetchFilters called:", { filterValues, showLoading });

      if (showLoading) {
        setLoading(true);
      }
      try {
        console.log("Making API request...");
        const startTime = Date.now();

        const data = await getFilter(sectId, filterValues);

        const endTime = Date.now();
        console.log(`API request completed in ${endTime - startTime}ms`);

        const filterData = data.filters || data;
        setFilters(filterData);
        setSummary(data.summary || null);

        // Вычисляем disabledOptions только при первой загрузке или при сбросе
        if (Object.keys(filterValues).length === 0) {
          const disabledOpts = calculateDisabledOptions(filterData);
          setDisabledOptions(disabledOpts);
        }

        setLoading(false);
      } catch (error) {
        console.error("fetchFilters error:", error);
        setError("Ошибка загрузки фильтров");
        setLoading(false);
      }
    },
    [sectId, calculateDisabledOptions]
  );

  const handleFilterChange = useCallback(
    (propId: string, value: unknown) => {
      const updated = { ...values, [propId]: value };
      setValues(updated);
      fetchFilters(updated, false);
    },
    [values, fetchFilters]
  );

  const handleRangeChange = useCallback(
    (propId: string, range: [number, number]) => {
      const updated = {
        ...values,
        [`${propId}_gt`]: range[0],
        [`${propId}_lt`]: range[1],
      };
      setValues(updated);

      // Очищаем предыдущий таймаут
      if (rangeTimeoutRef.current) {
        clearTimeout(rangeTimeoutRef.current);
      }

      // Устанавливаем новый таймаут (500ms задержка)
      rangeTimeoutRef.current = setTimeout(() => {
        fetchFilters(updated, false);
      }, 500);
    },
    [values, fetchFilters]
  );

  const handleReset = useCallback(async () => {
    setValues({});
    await fetchFilters({}, false);
  }, [fetchFilters]);

  return {
    filters,
    values,
    loading,
    error,
    summary,
    disabledOptions,
    setValues,
    fetchFilters,
    handleFilterChange,
    handleRangeChange,
    handleReset,
  };
}
