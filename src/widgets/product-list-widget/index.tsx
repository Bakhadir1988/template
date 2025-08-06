'use client';

import React from 'react';

import { ProductItem } from '@/entities';
import { CatalogItem } from '@/shared/types/catalogTypes';

import styles from './product-list-widget.module.scss';

export const ProductListWidget = ({
  title = 'Список товаров',
  items,
}: {
  title?: string;
  items: CatalogItem[];
}) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2>{title}</h2>
          <div className={styles.list}>
            {items.map((item) => (
              <ProductItem key={item.item_id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
