'use client';

import { useMemo, useState } from 'react';

import type { FilterPropType, SelectedValues } from '../../model/types';
import { FilterItemComponent } from '../filter-item';
import styles from './filter-panel.module.scss';

interface FilterPanelProps {
  config: FilterPropType[];
  initial?: SelectedValues;
  onChange?: (selected: SelectedValues) => void;
  extraRight?: React.ReactNode;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  config,
  initial,
  onChange,
  extraRight,
}) => {
  const [selected, setSelected] = useState<SelectedValues>(initial || {});

  const totalSelected = useMemo(() => {
    return Object.values(selected).reduce((acc, val) => {
      if (Array.isArray(val)) return acc + val.length;
      if (typeof val === 'boolean') return acc + (val ? 1 : 0);
      return acc;
    }, 0);
  }, [selected]);

  const handleChange = (id: string, val: SelectedValues[string]) => {
    setSelected((prev) => {
      const next: SelectedValues = { ...prev, [id]: val };
      onChange?.(next);
      return next;
    });
  };

  const handleClear = (id: string) => {
    setSelected((prev) => {
      const next: SelectedValues = { ...prev };
      delete next[id];
      onChange?.(next);
      return next;
    });
  };

  const clearAll = () => {
    setSelected({});
    onChange?.({});
  };

  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.list}>
          {extraRight}
          {config.map((item) => (
            <FilterItemComponent
              key={item.prop_id}
              item={item}
              value={selected[item.prop_id]}
              onChange={(val) => handleChange(item.prop_id, val)}
              onClear={() => handleClear(item.prop_id)}
            />
          ))}
          {totalSelected > 0 && (
            <button
              type="button"
              className={styles.clearAll}
              onClick={clearAll}
            >
              Очистить все
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
