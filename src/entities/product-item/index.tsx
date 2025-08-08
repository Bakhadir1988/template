import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CatalogItem } from '@/shared/types/catalogTypes';
import { Button } from '@/shared/ui';

import styles from './product-item.module.scss';

export const ProductItem = ({ item }: { item: CatalogItem }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        {item.imgs && item.imgs.length > 0 && (
          <div className={styles.image__wrapper}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imgs[0]}`}
              alt={item.title}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <Link href={item.url}>{item.title}</Link>
        {item.price && <span>{item.price} ₽</span>}
        <ul>
          {item.chars.class && (
            <li className={styles.char}>
              <strong>Класс:</strong> {item.chars.class}
            </li>
          )}
          {item.chars.type && (
            <li className={styles.char}>
              <strong>Тип:</strong> {item.chars.type}
            </li>
          )}
          {item.chars.vendor && (
            <li className={styles.char}>
              <strong>Производитель:</strong> {item.chars.vendor}
            </li>
          )}
          {item.chars.density && (
            <li className={styles.char}>
              <strong>Плотность:</strong> {item.chars.density}
            </li>
          )}
          {item.chars.alcohol && (
            <li className={styles.char}>
              <strong>Алкоголь:</strong> {item.chars.alcohol}
            </li>
          )}
          {item.chars.test_string && (
            <li className={styles.char}>
              <strong>Тест:</strong> {item.chars.test_string}
            </li>
          )}
        </ul>

        <Button>Какая-то кнопка</Button>
      </div>
    </div>
  );
};
