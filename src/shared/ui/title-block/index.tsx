import React from 'react';

import styles from './title-block.module.scss';

export const TitleBlock = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.content}>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>
    </section>
  );
};
