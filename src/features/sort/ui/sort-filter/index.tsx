import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';

import type { SortField, SortOption, SortState } from '../../model/types';
import styles from './sort-filter.module.scss';

const SORT_OPTIONS: Record<SortOption, string> = {
  'title;asc': 'По алфавиту Я-А',
  'title;desc': 'По алфавиту А-Я',
  'price;asc': 'По убыванию цены',
  'price;desc': 'По возрастанию цены',
};

type SortFilterProps = {
  value: SortState;
  onChange: (next: SortState) => void;
};

export const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const currentOption = `${value.field};${value.order}` as SortOption;

  console.log('currentOption', currentOption);

  const handleOptionChange = (option: SortOption): void => {
    const [field, order] = option.split(';') as [SortField, 'asc' | 'desc'];
    onChange({ field, order });
  };

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.header} onClick={() => setIsExpanded((v) => !v)}>
        <div className={styles.current}>Сортировка</div>

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
          onValueChange={(v) => handleOptionChange(v as SortOption)}
        >
          {(Object.keys(SORT_OPTIONS) as SortOption[]).map((option) => (
            <label key={option} className={styles.item}>
              <RadioGroup.Item className={styles.radio} value={option}>
                <RadioGroup.Indicator className={styles.indicator} />
              </RadioGroup.Item>
              <span className={styles.label}>{SORT_OPTIONS[option]}</span>
            </label>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  );
};
