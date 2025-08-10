import { DotFilledIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';

import type { FilterOption } from '../../model/types';
import styles from './radio-group.module.scss';

interface RadioGroupUIProps {
  options: FilterOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export const RadioGroupUI: React.FC<RadioGroupUIProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <RadioGroup.Root
      className={styles.root}
      value={value}
      onValueChange={onChange}
    >
      {options.map((option) => (
        <div key={option.value} className={styles.item}>
          <RadioGroup.Item className={styles.radio} value={option.value}>
            <RadioGroup.Indicator className={styles.indicator}>
              <DotFilledIcon width={14} height={14} />
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          <label className={styles.label}>{option.label}</label>
          <span className={styles.count}>({option.count})</span>
        </div>
      ))}
    </RadioGroup.Root>
  );
};
