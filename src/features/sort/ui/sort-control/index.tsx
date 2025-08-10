import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import React from 'react';

import type { SortField, SortState } from '../../model/types';
import styles from './sort-control.module.scss';

const FIELD_LABEL: Record<SortField, string> = {
  alphabet: 'По алфавиту',
  price: 'По цене',
  rating: 'По рейтингу',
};

interface SortControlProps {
  value: SortState;
  onChange: (next: SortState) => void;
}

export const SortControl: React.FC<SortControlProps> = ({
  value,
  onChange,
}) => {
  const setField = (field: SortField) => {
    onChange({ field, order: value.order });
  };

  const toggleOrder = () => {
    onChange({
      field: value.field,
      order: value.order === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.fields}>
        {(['alphabet', 'price', 'rating'] as SortField[]).map((field) => (
          <button
            key={field}
            type="button"
            className={`${styles.button} ${value.field === field ? styles.active : ''}`}
            onClick={() => setField(field)}
          >
            {FIELD_LABEL[field]}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.order}
        onClick={toggleOrder}
        aria-label="Поменять порядок"
      >
        {value.order === 'asc' ? (
          <ArrowUpNarrowWide size={16} />
        ) : (
          <ArrowDownWideNarrow size={16} />
        )}
      </button>
    </div>
  );
};
