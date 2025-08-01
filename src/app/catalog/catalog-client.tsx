"use client";

import React, { useState } from "react";
import { CatalogListWidget, FilterWidget } from "@/widgets";
import { CatalogItem } from "@/shared/api/catalogApi";
import { extractItemsFromResponse } from "@/shared/lib/utils/responseHelpers";

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
    const extractedItems = extractItemsFromResponse(filteredData);
    if (extractedItems) {
      setItems(extractedItems);
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
