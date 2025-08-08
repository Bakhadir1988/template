import Link from 'next/link';
import React from 'react';

import { BreadcrumbItem } from '@/shared/types/breadcrumbsType';

import styles from './breadcrumbs.module.css';

interface BreadcrumbsProps {
  path?: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  const breadcrumbItems = path || [];

  return (
    <section className={styles.root}>
      <div className="container">
        <nav aria-label="Хлебные крошки">
          <ol className={styles.list}>
            {breadcrumbItems.map((item, index) => (
              <li key={index} className={styles.item}>
                {index === breadcrumbItems.length - 1 ? (
                  <span
                    className={`${styles.text} ${styles.active}`}
                    aria-current="page"
                  >
                    {item.title}
                  </span>
                ) : (
                  <>
                    <Link href={item.url || '#'} className={styles.link}>
                      {item.title}
                    </Link>
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
};
