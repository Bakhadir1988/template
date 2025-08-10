import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';

import type { SortField, SortState } from '../../model/types';
import styles from './sort-filter.module.scss';

const FIELD_LABEL: Record<SortField, string> = {
  alphabet: 'По алфавиту',
  price: 'По цене',
  rating: 'По рейтингу',
};

type SortFilterProps = {
  value: SortState;
  onChange: (next: SortState) => void;
};

export const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const setField = (field: SortField): void => {
    onChange({ field, order: value.order });
  };

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.header} onClick={() => setIsExpanded((v) => !v)}>
        <div className={styles.current}>{FIELD_LABEL[value.field]}</div>

        <ChevronDownIcon
          className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}
        />
      </div>
      <div
        className={`${styles.content} ${isExpanded ? styles.visible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <RadioGroup.Root
          className={styles.group}
          value={value.field}
          onValueChange={(v) => setField(v as SortField)}
        >
          {(['alphabet', 'price', 'rating'] as SortField[]).map((field) => (
            <label key={field} className={styles.item}>
              <RadioGroup.Item className={styles.radio} value={field}>
                <RadioGroup.Indicator className={styles.indicator} />
              </RadioGroup.Item>
              <span className={styles.label}>{FIELD_LABEL[field]}</span>
            </label>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  );
};
