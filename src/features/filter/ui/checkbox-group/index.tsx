import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import React from 'react';

import { FilterValuesType } from '../../model/types';
import styles from './checkbox-group.module.scss';

interface CheckboxGroupProps {
  options: FilterValuesType;
  values: string[];
  onChange: (values: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  values,
  onChange,
}) => {
  const handleToggle = (value: string) => {
    const isSelected = values.includes(value);
    if (isSelected) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div className={styles.root}>
      {Object.entries(options).map(([value, option]) => (
        <label key={value} className={styles.item}>
          <Checkbox.Root
            className={styles.checkbox}
            checked={values.includes(value)}
            onCheckedChange={() => handleToggle(value)}
          >
            <Checkbox.Indicator className={styles.indicator}>
              <CheckIcon width={14} height={14} />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className={styles.label}>{option.label}</span>
          <span className={styles.count}>({option.total_count})</span>
        </label>
      ))}
    </div>
  );
};
