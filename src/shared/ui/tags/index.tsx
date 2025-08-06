import Link from 'next/link';
import React from 'react';

import { CatalogSection } from '@/shared/types/catalogTypes';

import styles from './tags.module.scss';

type TagsProps = {
  tags: CatalogSection[];
  title?: string;
};

export const Tags = ({ tags }: TagsProps) => {
  if (!tags || !tags.length) return null;

  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.list}>
          {tags.map((tag) => (
            <Link key={tag.item_id} href={tag.url} className={styles.link}>
              {tag.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
