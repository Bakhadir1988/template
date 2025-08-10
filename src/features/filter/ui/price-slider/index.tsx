import * as Slider from '@radix-ui/react-slider';
import React from 'react';

import type { PriceFilterType } from '../../model/types';
import styles from './price-slider.module.scss';

interface PriceSliderProps {
  range: PriceFilterType;
  value?: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceSlider: React.FC<PriceSliderProps> = ({
  range,
  value,
  onChange,
}) => {
  const minValue = Number(range.min);
  const maxValue = Number(range.max);
  const current: [number, number] = value ?? [minValue, maxValue];

  return (
    <div className={styles.root}>
      <div className={styles.inputs}>
        <input
          className={styles.input}
          type="number"
          value={current[0]}
          min={minValue}
          max={maxValue}
          step={1}
          onChange={(e) => onChange([Number(e.target.value), current[1]])}
        />
        <span className={styles.separator}>—</span>
        <input
          className={styles.input}
          type="number"
          value={current[1]}
          min={minValue}
          max={maxValue}
          step={1}
          onChange={(e) => onChange([current[0], Number(e.target.value)])}
        />
      </div>
      <Slider.Root
        className={styles.slider}
        min={minValue}
        max={maxValue}
        step={1}
        value={current}
        onValueChange={(newValue) => onChange([newValue[0], newValue[1]])}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className={styles.track}>
          <Slider.Range className={styles.range} />
        </Slider.Track>
        <Slider.Thumb className={styles.thumb} />
        <Slider.Thumb className={styles.thumb} />
      </Slider.Root>
    </div>
  );
};
