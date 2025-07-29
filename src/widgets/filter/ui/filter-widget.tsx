import React from "react";

import styles from "./filter-widget.module.scss";
import { ProductFilter } from "@/features/product-filter";

export const FilterWidget = ({ sectId }: { sectId: string }) => {
  return (
    <div className={styles.root}>
      <ProductFilter sectId={sectId} />
    </div>
  );
};
