"use client";

import React, { useState } from "react";
import { CatalogListWidget, FilterWidget } from "@/widgets";
import {
  CatalogItem,
  CatalogPagination,
  fetchCatalog,
} from "@/shared/api/catalogApi";
import { extractItemsFromResponse } from "@/shared/lib/utils/responseHelpers";

type CatalogClientProps = {
  initialItems: CatalogItem[];
  sectId: string;
  pagination: CatalogPagination;
};

export const CatalogClient: React.FC<CatalogClientProps> = ({
  initialItems,
  sectId,
  pagination,
}) => {
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [currentPagination, setCurrentPagination] =
    useState<CatalogPagination>(pagination);
  const [loading, setLoading] = useState(false);

  const handleFilterApplied = (filteredData: unknown) => {
    const extractedItems = extractItemsFromResponse(filteredData);
    if (extractedItems) {
      setItems(extractedItems);
    }

    // Обновляем пагинацию если она есть в ответе
    if (
      filteredData &&
      typeof filteredData === "object" &&
      "pagi" in filteredData
    ) {
      setCurrentPagination(filteredData.pagi as CatalogPagination);
    }
  };

  const handlePageChange = async (page: number) => {
    if (page === currentPagination.current_page) return;

    setLoading(true);
    try {
      const data = await fetchCatalog(page);
      setItems(data.items);
      setCurrentPagination(data.pagi);
    } catch (error) {
      console.error("Error fetching page:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Каталог</h1>
      <FilterWidget sectId={sectId} onFilterApplied={handleFilterApplied} />
      {loading && <div>Загрузка...</div>}
      <CatalogListWidget
        items={items}
        pagination={currentPagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
