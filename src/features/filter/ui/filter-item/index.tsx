// import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import type {
  FilterPropType,
  FilterValuesType,
  PriceFilterType,
  SelectedValues,
} from '../../model/types';
import { BooleanSwitch } from '../boolean-switch';
import { CheckboxGroup } from '../checkbox-group';
import { PriceSlider } from '../price-slider';
import styles from './filter-item.module.scss';

interface FilterItemComponentProps {
  item: FilterPropType;
  value: SelectedValues[string];
  onChange: (value: SelectedValues[string]) => void;
  onClear: () => void;
}

export const FilterItemComponent: React.FC<FilterItemComponentProps> = ({
  item,
  value,
  onChange,
  onClear,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedCount = useMemo(() => {
    if (item.type === 'BOOLEAN' || item.type === 'PRICE') return 0;
    if (Array.isArray(value)) return value.length;
    return 0;
  }, [item.type, value]);

  const priceBadge = useMemo(() => {
    if (item.type === 'PRICE' && Array.isArray(value)) {
      return `от ${value[0]} до ${value[1]}`;
    }
    return undefined;
  }, [item.type, value]);

  const hasSelectedValue =
    selectedCount > 0 ||
    (item.type === 'BOOLEAN' && Boolean(value)) ||
    priceBadge;

  return (
    <div
      className={clsx(styles.root)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.title}>{item.title}</div>
        {selectedCount > 0 && (
          <div className={styles.badge}>{selectedCount}</div>
        )}
        {priceBadge && <div className={styles.priceBadge}>{priceBadge}</div>}
        {hasSelectedValue && item.type !== 'BOOLEAN' ? (
          <Cross2Icon
            className={styles.clearIcon}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        ) : (
          <ChevronDownIcon
            className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}
          />
        )}
      </div>
      <div
        className={`${styles.content} ${isExpanded ? styles.visible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'ENUM' && item.filter && (
          <CheckboxGroup
            options={item.filter as FilterValuesType}
            values={
              Array.isArray(value) && typeof value[0] === 'string'
                ? (value as string[])
                : []
            }
            onChange={onChange as (values: string[]) => void}
          />
        )}
        {item.type === 'BOOLEAN' && (
          <BooleanSwitch
            checked={Boolean(value)}
            onChange={onChange as (checked: boolean) => void}
            label=""
          />
        )}
        {item.type === 'PRICE' && item.filter && (
          <PriceSlider
            range={item.filter as PriceFilterType}
            value={
              Array.isArray(value) && typeof value[0] === 'number'
                ? (value as [number, number])
                : undefined
            }
            onChange={onChange as (value: [number, number]) => void}
          />
        )}
      </div>
    </div>
  );
};
