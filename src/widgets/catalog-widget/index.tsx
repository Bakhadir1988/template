'use client';

import React, { useEffect, useRef, useState } from 'react';

import { getFilter } from '@/features/filter';
import type { FilterResponse, SelectedValues } from '@/features/filter';
import { Pagination } from '@/features/pagination';
import type { SortState } from '@/features/sort';
import { postCatalogFilters } from '@/shared/api/catalogApi';
import type {
  CatalogItem,
  CatalogPagination,
} from '@/shared/types/catalogTypes';

import { FilterWidget } from '../filter-widget';
import { ProductListWidget } from '../product-list-widget';

export const CatalogWidget = ({
  sectionId,
  initialItems,
  pagi,
}: {
  sectionId: string;
  initialItems?: CatalogItem[];
  pagi: CatalogPagination;
}) => {
  const [items, setItems] = useState<CatalogItem[] | undefined>(initialItems);
  const [pagination, setPagination] = useState<CatalogPagination>(pagi);
  const [isLoading, setIsLoading] = useState(false);
  const [filterConfig, setFilterConfig] = useState<FilterResponse | null>(null);
  const selectedRef = useRef<SelectedValues>({});
  const debounceTimer = useRef<number | null>(null);
  const [currentPage, setCurrentPage] = useState(pagi.current_page);

  // Получаем начальную конфигурацию фильтра
  useEffect(() => {
    const fetchFilterConfig = async () => {
      const data = await getFilter(sectionId);
      setFilterConfig(data);
    };
    fetchFilterConfig();
  }, [sectionId]);

  // Сортировка
  const [sort, setSort] = React.useState<SortState | null>(null);

  // Обработчик изменения сортировки
  const handleSortChange = (newSort: SortState) => {
    setSort(newSort);
    // Обновляем товары при изменении сортировки мгновенно, но с setTimeout
    const currentFilters = selectedRef.current || {};
    // Сортировка должна срабатывать мгновенно, но после завершения рендеринга
    setTimeout(() => {
      requestUpdateImmediate(currentFilters, newSort);
    }, 0);
  };

  // Мгновенное обновление для сортировки (без debounce)
  const requestUpdateImmediate = async (
    selected: SelectedValues,
    currentSort?: SortState | null,
  ) => {
    selectedRef.current = selected;
    setIsLoading(true);
    try {
      const form = buildFormData(selectedRef.current, currentSort);
      // const sortToUse = currentSort || sort;

      const catalog = await postCatalogFilters(form);
      if (catalog) {
        setItems(catalog.items || []);
        if (catalog.pagi) {
          setPagination(catalog.pagi);
          setCurrentPage(1);
        }

        // Получаем обновленную информацию о фильтрах
        try {
          const updatedFilterConfig = await getFilter(sectionId);
          setFilterConfig(updatedFilterConfig);
        } catch (error) {
          console.error('Ошибка при получении обновленных фильтров:', error);
        }
      } else {
        console.error('Не удалось получить данные каталога');
      }
    } catch (error) {
      console.error('Ошибка при обновлении фильтра:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик изменения фильтров
  const handleFilterChange = (selected: SelectedValues) => {
    // Проверяем, есть ли изменения в ценовом фильтре
    const hasPriceChanges = Object.entries(selected).some(([, value]) => {
      // Проверяем, является ли это ценовым фильтром (массив из двух чисел)
      return (
        Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === 'number' &&
        typeof value[1] === 'number'
      );
    });

    if (hasPriceChanges) {
      requestUpdate(selected, sort);
    } else {
      setTimeout(() => {
        requestUpdateImmediate(selected, sort);
      }, 0);
    }
  };

  // Преобразование выбранных значений -> FormData
  const buildFormData = (
    selected: SelectedValues,
    currentSort?: SortState | null,
  ): FormData => {
    const form = new FormData();
    form.append('comp', 'catblock');
    form.append('template', 'filter');
    form.append('sect_id', sectionId);

    // Используем переданную сортировку или текущую
    const sortToUse = currentSort || sort;

    // Добавляем сортировку только если она задана
    if (sortToUse) {
      form.append('sort', `${sortToUse.field};${sortToUse.order}`);
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
  const requestUpdate = (
    selected: SelectedValues,
    currentSort?: SortState | null,
  ) => {
    selectedRef.current = selected;
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const form = buildFormData(selectedRef.current, currentSort);

        const catalog = await postCatalogFilters(form);
        if (catalog) {
          setItems(catalog.items || []);
          if (catalog.pagi) {
            setPagination(catalog.pagi);
            setCurrentPage(1);
          }

          // Получаем обновленную информацию о фильтрах
          try {
            const updatedFilterConfig = await getFilter(sectionId);
            setFilterConfig(updatedFilterConfig);
          } catch (error) {
            console.error('Ошибка при получении обновленных фильтров:', error);
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
      const form = buildFormData(selectedRef.current, sort);
      // Добавляем параметр страницы
      form.append('page', String(page));

      const catalog = await postCatalogFilters(form);
      if (catalog) {
        setItems(catalog.items || []);
        if (catalog.pagi) {
          setPagination(catalog.pagi);
        }

        // Получаем обновленную информацию о фильтрах при пагинации тоже
        try {
          const updatedFilterConfig = await getFilter(sectionId);
          setFilterConfig(updatedFilterConfig);
        } catch (error) {
          console.error('Ошибка при получении обновленных фильтров:', error);
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
          <FilterWidget
            filterConfig={filterConfig}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sortState={sort}
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
