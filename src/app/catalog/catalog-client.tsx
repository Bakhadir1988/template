"use client";

import React, { useState } from "react";
import { CatalogListWidget, FilterWidget } from "@/widgets";
import { CatalogItem } from "@/shared/api/catalogApi";

type CatalogClientProps = {
  initialItems: CatalogItem[];
  sectId: string;
};

export const CatalogClient: React.FC<CatalogClientProps> = ({
  initialItems,
  sectId,
}) => {
  const [items, setItems] = useState<CatalogItem[]>(initialItems);

  const handleFilterApplied = (filteredData: unknown) => {
    // Предполагаем, что сервер возвращает отфильтрованные товары
    if (
      filteredData &&
      typeof filteredData === "object" &&
      "items" in filteredData
    ) {
      const newItems = (filteredData as { items: CatalogItem[] }).items;
      setItems(newItems);
    }
  };

  return (
    <div className="container">
      <h1>Каталог</h1>
      <FilterWidget sectId={sectId} onFilterApplied={handleFilterApplied} />
      <CatalogListWidget items={items} />
    </div>
  );
};
