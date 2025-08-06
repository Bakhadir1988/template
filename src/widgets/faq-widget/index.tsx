'use client';

import React from 'react';

import { CatalogSectionFaq } from '@/shared/types/catalogTypes';
import { AccordionUi } from '@/shared/ui';

import styles from './faq-widget.module.scss';

export const FaqWidget = ({ items }: { items: CatalogSectionFaq[] }) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>FAQ</h2>
          <AccordionUi items={items} />
        </div>
      </div>
    </section>
  );
};
