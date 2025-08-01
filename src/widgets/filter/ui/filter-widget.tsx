import React from "react";

import styles from "./filter-widget.module.scss";
import { ProductFilter } from "@/features/product-filter";

export const FilterWidget = ({
  sectId,
  onFilterApplied,
}: {
  sectId: string;
  onFilterApplied?: (filteredData: unknown) => void;
}) => {
  return (
    <div className={styles.root}>
      <ProductFilter sectId={sectId} onFilterApplied={onFilterApplied} />
    </div>
  );
};
