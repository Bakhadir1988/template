import React from 'react';

import { SectionItem } from '@/entities';
import { CatalogSection } from '@/shared/types/catalogTypes';

import styles from './section-widget.module.scss';

export const SectionWidget = ({
  sections,
}: {
  sections?: CatalogSection[];
}) => {
  if (!sections || sections.length === 0) {
    return null;
  }
  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2>Разделы</h2>
          <div className={styles.subsections}>
            {sections?.map((section) => (
              <SectionItem key={section.item_id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
