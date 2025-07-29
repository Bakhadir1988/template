import { ProductCard } from "@/entities/product";
import type { CatalogItemDto } from "@/shared/api/catalogApi";
import { mapCatalogItemToProduct } from "@/entities/product/model/mapper";

import styles from "./catalog-list-widget.module.scss";

interface CatalogListProps {
  items: CatalogItemDto[];
}

export const CatalogListWidget: React.FC<CatalogListProps> = ({ items }) => (
  <div className={styles.root}>
    {items.length === 0 && <div>Нет товаров</div>}
    {items.map((item) => (
      <ProductCard key={item.item_id} item={mapCatalogItemToProduct(item)} />
    ))}
  </div>
);
