'use client';

import React, { useEffect, useRef, useState } from 'react';

import { FilterPanel } from '@/features/filter';
import { getFilter } from '@/features/filter/api';
import type { SelectedValues } from '@/features/filter/model/types';
import { FilterPropType, FilterResponse } from '@/features/filter/model/types';
import { SortFilter, SortState } from '@/features/sort';
import { postCatalogFilters } from '@/shared/api/catalogApi';
import type { CatalogItem } from '@/shared/types/catalogTypes';

import { ProductListWidget } from '../product-list-widget';

export const FilterWidget = ({
  sectionId,
  initialItems,
}: {
  sectionId: string;
  initialItems?: CatalogItem[];
}) => {
  const [filterConfig, setFilterConfig] = useState<FilterResponse | null>(null);
  const [items, setItems] = useState<CatalogItem[] | undefined>(initialItems);
  const selectedRef = useRef<SelectedValues>({});
  const debounceTimer = useRef<number | null>(null);

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

  // Преобразование выбранных значений -> FormData
  const buildFormData = (selected: SelectedValues): FormData => {
    const form = new FormData();
    form.append('comp', 'catblock');
    form.append('template', 'filter');
    form.append('sect_id', sectionId);

    Object.entries(selected).forEach(([propId, raw]) => {
      if (raw === undefined || raw === null) return;
      if (Array.isArray(raw)) {
        if (
          raw.length === 2 &&
          typeof raw[0] === 'number' &&
          typeof raw[1] === 'number'
        ) {
          // PRICE
          form.append(`filter[${propId}][gt]`, String(raw[0]));
          form.append(`filter[${propId}][lt]`, String(raw[1]));
        } else {
          // ENUM/STRING множественный выбор
          for (const val of raw) {
            form.append(`filter[${propId}][]`, String(val));
          }
        }
      } else if (typeof raw === 'boolean') {
        if (raw) form.append(`filter[${propId}]`, '1');
      } else {
        form.append(`filter[${propId}]`, String(raw));
      }
    });

    return form;
  };

  const requestUpdate = (selected: SelectedValues) => {
    selectedRef.current = selected;
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = window.setTimeout(async () => {
      const form = buildFormData(selectedRef.current);
      const catalog = await postCatalogFilters(form);
      setItems(catalog?.items || []);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <>
      <FilterPanel
        config={filter}
        onChange={(selected) => requestUpdate(selected)}
        extraRight={<SortFilter value={sort} onChange={setSort} />}
      />
      {items && items.length ? (
        <div style={{ marginTop: 16 }}>
          <ProductListWidget items={items} />
        </div>
      ) : null}
    </>
  );
};
