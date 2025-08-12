'use client';

import React, { useEffect, useRef, useState } from 'react';

import { FilterPanel } from '@/features/filter';
import { getFilter } from '@/features/filter/api';
import type { SelectedValues } from '@/features/filter/model/types';
import { FilterPropType, FilterResponse } from '@/features/filter/model/types';
import { Pagination } from '@/features/pagination/ui';
import { SortFilter, SortState } from '@/features/sort';
import { postCatalogFilters } from '@/shared/api/catalogApi';
import type {
  CatalogItem,
  CatalogPagination,
} from '@/shared/types/catalogTypes';

import { ProductListWidget } from '../product-list-widget';

export const FilterWidget = ({
  sectionId,
  initialItems,
  pagi,
}: {
  sectionId: string;
  initialItems?: CatalogItem[];
  pagi: CatalogPagination;
}) => {
  const [filterConfig, setFilterConfig] = useState<FilterResponse | null>(null);
  const [items, setItems] = useState<CatalogItem[] | undefined>(initialItems);
  const [pagination, setPagination] = useState<CatalogPagination>(pagi);
  const [isLoading, setIsLoading] = useState(false);
  const selectedRef = useRef<SelectedValues>({});
  const debounceTimer = useRef<number | null>(null);
  const [currentPage, setCurrentPage] = useState(pagi.current_page);

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
    field: 'title',
    order: 'desc',
  });

  // Обработчик изменения сортировки
  const handleSortChange = (newSort: SortState) => {
    console.log('handleSortChange вызван с новыми значениями:', newSort);
    setSort(newSort);
    // Обновляем товары при изменении сортировки
    if (selectedRef.current) {
      console.log(
        'Вызываем requestUpdate с текущими фильтрами:',
        selectedRef.current,
      );
      requestUpdate(selectedRef.current);
    } else {
      console.log('Нет выбранных фильтров, отправляем пустой запрос');
      requestUpdate({});
    }
  };

  // Преобразование выбранных значений -> FormData
  const buildFormData = (selected: SelectedValues): FormData => {
    const form = new FormData();
    form.append('comp', 'catblock');
    form.append('template', 'filter');
    form.append('sect_id', sectionId);

    // Добавляем параметры сортировки
    form.append('sort', `${sort.field};${sort.order}`);

    console.log('Добавляем параметры сортировки в FormData:', {
      sort: `${sort.field};${sort.order}`,
      field: sort.field,
      order: sort.order,
    });

    // Проверим содержимое FormData
    console.log('Содержимое FormData после добавления сортировки:');
    for (const [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }

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

  // Запрос на обновление фильтра
  const requestUpdate = (selected: SelectedValues) => {
    selectedRef.current = selected;
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const form = buildFormData(selectedRef.current);
        console.log('Отправляем запрос с сортировкой:', {
          field: sort.field,
          order: sort.order,
        });
        const catalog = await postCatalogFilters(form);
        if (catalog) {
          setItems(catalog.items || []);
          if (catalog.pagi) {
            setPagination(catalog.pagi);
            setCurrentPage(1);
          }
        } else {
          console.error('Не удалось получить данные каталога');
        }
      } catch (error) {
        console.error('Ошибка при обновлении фильтра:', error);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  // Запрос на обновление страницы
  const requestPageUpdate = async (page: number) => {
    setIsLoading(true);
    try {
      setCurrentPage(page);
      const form = buildFormData(selectedRef.current);
      // Добавляем параметр страницы
      form.append('page', String(page));
      console.log('Отправляем запрос пагинации с сортировкой:', {
        page,
        field: sort.field,
        order: sort.order,
      });
      const catalog = await postCatalogFilters(form);
      if (catalog) {
        setItems(catalog.items || []);
        if (catalog.pagi) {
          setPagination(catalog.pagi);
        }
      } else {
        console.error('Не удалось получить данные каталога для страницы', page);
      }
    } catch (error) {
      console.error('Ошибка при загрузке страницы:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Очистка таймера
  useEffect(() => {
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <>
      {items && items.length ? (
        <>
          <FilterPanel
            config={filter}
            onChange={(selected) => requestUpdate(selected)}
            extraRight={<SortFilter value={sort} onChange={handleSortChange} />}
          />
          {/* {isLoading && <LoadingSpinner text="Обновление товаров..." />} */}
          <ProductListWidget items={items} />
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.total_pages}
            onPageChange={isLoading ? () => {} : requestPageUpdate}
            totalItems={parseInt(pagination.total_items)}
            itemsPerPage={parseInt(pagination.items_per_page)}
          />
        </>
      ) : null}
    </>
  );
};
