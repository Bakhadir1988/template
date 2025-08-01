import { ProductCard } from "@/entities/product";
import type { CatalogItem, CatalogPagination } from "@/shared/api/catalogApi";
import { mapCatalogItemToProduct } from "@/entities/product/model/mapper";
import { Pagination } from "./pagination";

import styles from "./catalog-list-widget.module.scss";

interface CatalogListProps {
  items: CatalogItem[];
  pagination?: CatalogPagination;
  onPageChange?: (page: number) => void;
}

export const CatalogListWidget: React.FC<CatalogListProps> = ({
  items,
  pagination,
  onPageChange,
}) => {
  // Отладочная информация
  console.log("CatalogListWidget:", {
    totalItems: items.length,
    pagination,
  });

  return (
    <div className={styles.root}>
      {items.length === 0 && <div>Нет товаров</div>}

      <div className={styles.itemsGrid}>
        {items.map((item) => (
          <ProductCard
            key={item.item_id}
            item={mapCatalogItemToProduct(item)}
          />
        ))}
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={onPageChange || (() => {})}
        />
      )}
    </div>
  );
};
