'use client';

import React from 'react';

import { FilterPanel } from '@/features/filter';
import type {
  FilterPropType,
  FilterResponse,
  SelectedValues,
} from '@/features/filter';
import { SortFilter } from '@/features/sort';
import type { SortState } from '@/features/sort';

export const FilterWidget = ({
  filterConfig,
  onFilterChange,
  onSortChange,
  sortState,
}: {
  filterConfig: FilterResponse | null;
  onFilterChange: (selected: SelectedValues) => void;
  onSortChange: (sort: SortState) => void;
  sortState: SortState | null;
}) => {
  // Убираем корневой тип и группу sections_objects у фильтра
  const filterProps = filterConfig?.props.filter(
    (item) => item.type_name !== 'Корневой тип',
  );

  const groups = Object.values(filterProps?.[0]?.groups || {}).filter(
    (item) => item.tpl_key !== 'sections_objects',
  );

  // Объединяем props из __nogroup и chars в один массив для фильтра
  const filter = groups.reduce((acc, group) => {
    const groupProps = Object.values(group.props || {});
    return [...acc, ...groupProps];
  }, [] as FilterPropType[]);

  return (
    <FilterPanel
      config={filter}
      onChange={onFilterChange}
      extraRight={<SortFilter value={sortState} onChange={onSortChange} />}
    />
  );
};
