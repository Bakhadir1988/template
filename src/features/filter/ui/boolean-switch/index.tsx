import * as Switch from '@radix-ui/react-switch';
import React from 'react';

import styles from './boolean-switch.module.scss';

interface BooleanSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const BooleanSwitch: React.FC<BooleanSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className={styles.root}>
      <span className={styles.label}>{label}</span>
      <Switch.Root
        className={styles.switch}
        checked={checked}
        onCheckedChange={onChange}
      >
        <Switch.Thumb className={styles.thumb} />
      </Switch.Root>
    </label>
  );
};
