import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';

import type { SortField, SortOption, SortState } from '../../model/types';
import styles from './sort-filter.module.scss';

const SORT_OPTIONS: Record<SortOption, string> = {
  'title;asc': 'По алфавиту А-Я',
  'title;desc': 'По алфавиту Я-А',
  'price;asc': 'По возрастанию цены',
  'price;desc': 'По убыванию цены',
};

type SortFilterProps = {
  value: SortState | null;
  onChange: (next: SortState) => void;
};

export const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const currentOption = value
    ? (`${value.field};${value.order}` as SortOption)
    : null;

  // Скрываем выпадающий блок при изменении значения
  React.useEffect(() => {
    setIsExpanded(false);
  }, [value]);

  const handleOptionChange = (option: SortOption): void => {
    const [field, order] = option.split(';') as [SortField, 'asc' | 'desc'];
    onChange({ field, order });
  };

  // Определяем, что показывать в заголовке
  const getDisplayText = () => {
    // Если сортировка не выбрана, показываем "Сортировка"
    if (!currentOption) {
      return 'Сортировка';
    }
    // Показываем название выбранной сортировки
    return SORT_OPTIONS[currentOption];
  };

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.header} onClick={() => setIsExpanded((v) => !v)}>
        <div className={styles.current}>{getDisplayText()}</div>

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
          value={currentOption || undefined}
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
