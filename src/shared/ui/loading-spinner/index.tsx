import React from 'react';

import styles from './loading-spinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export const LoadingSpinner = ({
  size = 'medium',
  text = 'Загрузка...',
}: LoadingSpinnerProps) => {
  return (
    <div className={`${styles.root} ${styles[size]}`}>
      <div className={styles.spinner}></div>
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
};
