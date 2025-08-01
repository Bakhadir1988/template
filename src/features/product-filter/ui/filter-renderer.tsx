import React from "react";
import { FilterItem } from "@/entities/filter-item";
import { FilterGroup, FilterProp, FilterValues } from "../model/types";

interface FilterRendererProps {
  group: FilterGroup;
  values: FilterValues;
  disabledOptions: Record<string, number[]>;
  onFilterChange: (propId: string, value: unknown) => void;
  onRangeChange: (propId: string, range: [number, number]) => void;
}

export const FilterRenderer: React.FC<FilterRendererProps> = ({
  group,
  values,
  disabledOptions,
  onFilterChange,
  onRangeChange,
}) => {
  const propsArr: FilterProp[] = Object.values(group.props || {});

  return (
    <>
      {propsArr.map((prop) => {
        if (prop.filter_enabled !== "1") return null;

        if (prop.type === "ENUM" && prop.filter) {
          const options = Object.entries(prop.filter).map(([key, variant]) => ({
            value: key,
            label: variant.label,
            count: parseInt(variant.current_count) || 0,
            enabled:
              variant.current_count !== undefined &&
              parseInt(variant.current_count) > 0, // Проверяем наличие current_count
          }));

          // Используем disabledOptions из пропсов
          const propDisabledOptions = disabledOptions[prop.prop_id] || [];

          console.log("propDisabledOptions", propDisabledOptions);

          // Формируем optionLabels только для активных элементов
          const optionLabels = options.map((o) =>
            o.enabled ? `${o.label} (${o.count})` : undefined
          );

          return (
            <FilterItem
              key={prop.prop_id}
              type="checkbox"
              label={prop.title}
              options={options.map((o) => o.value)}
              optionLabels={optionLabels}
              disabledOptions={propDisabledOptions}
              value={
                Array.isArray(values[prop.prop_id])
                  ? (values[prop.prop_id] as string[])
                  : []
              }
              onChange={(value) => onFilterChange(prop.prop_id, value)}
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
                onRangeChange(prop.prop_id, value as [number, number])
              }
            />
          );
        }

        return null;
      })}
    </>
  );
};
