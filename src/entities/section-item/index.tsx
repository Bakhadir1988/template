import Link from 'next/link';
import React from 'react';

import { CatalogSection } from '@/shared/types/catalogTypes';

import styles from './section-item.module.scss';

export const SectionItem = ({ section }: { section: CatalogSection }) => {
  return (
    <div className={styles.root}>
      <Link className={styles.title} href={section.url}>
        {section.title}
      </Link>
      {section.sections && (
        <ul className={styles.list}>
          {section.sections.map((section) => (
            <li className={styles.item} key={section.item_id}>
              <Link className={styles.link} href={section.url}>
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
