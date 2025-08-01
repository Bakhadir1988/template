import {
  FilterResponse,
  FilterType,
  FilterGroup,
  FilterProp,
} from "../model/types";

/**
 * Строит payload для отправки фильтров на сервер
 */
export function buildFilterPayload(
  filters: FilterResponse,
  values: Record<string, unknown>
): Record<string, unknown> {
  const catalogType = filters.props.find(
    (t: FilterType) => t.type_name !== "Корневой тип"
  );
  if (!catalogType) return {};

  const groups = Object.values(catalogType.groups || {});
  const result: Record<string, unknown> = {};

  for (const group of groups) {
    const propsArr: FilterProp[] = Object.values(
      (group as FilterGroup).props || {}
    );
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
