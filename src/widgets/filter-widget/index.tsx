'use client';

import React, { useEffect, useState } from 'react';

import { FilterPanel } from '@/features/filter';
import { getFilter } from '@/features/filter/api';
import { FilterPropType, FilterResponse } from '@/features/filter/model/types';
import { SortFilter, SortState } from '@/features/sort';

export const FilterWidget = ({ sectionId }: { sectionId: string }) => {
  const [filterConfig, setFilterConfig] = useState<FilterResponse | null>(null);

  // Получаем фильтр
  useEffect(() => {
    const fetchFilterConfig = async () => {
      const data = await getFilter(sectionId);
      setFilterConfig(data);
    };
    fetchFilterConfig();
  }, [sectionId]);

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

  // Сортировка
  const [sort, setSort] = React.useState<SortState>({
    field: 'alphabet',
    order: 'asc',
  });

  return (
    <FilterPanel
      config={filter}
      extraRight={<SortFilter value={sort} onChange={setSort} />}
    />
  );
};
