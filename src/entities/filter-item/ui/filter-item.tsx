import React from "react";
import styles from "./filter-item.module.scss";

interface FilterItemProps {
  type: "checkbox" | "range" | "select" | "toggle";
  label: string;
  value?: unknown;
  onChange?: (value: unknown) => void;
  options?: string[];
  disabledOptions?: number[];
  min?: number;
  max?: number;
}

export const FilterItem = ({
  type,
  label,
  value,
  onChange,
  options = [],
  min = 0,
  max = 100,
}: FilterItemProps) => {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentValue = Array.isArray(value) ? value : [];
    const newValue = checked
      ? [...currentValue, option]
      : currentValue.filter((item: string) => item !== option);
    onChange?.(newValue);
  };

  return (
    <div className={styles.root}>
      <h4>{label}</h4>

      {type === "checkbox" && (
        <div className="checkbox-group">
          {options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={Array.isArray(value) && value.includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {type === "range" && (
        <div className="range-group">
          <div className="range-inputs">
            <input
              type="range"
              min={min}
              max={max}
              value={Array.isArray(value) ? value[0] || min : min}
              onChange={(e) => {
                const newValue = Array.isArray(value) ? [...value] : [min, max];
                newValue[0] = +e.target.value;
                onChange?.(newValue);
              }}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={Array.isArray(value) ? value[1] || max : max}
              onChange={(e) => {
                const newValue = Array.isArray(value) ? [...value] : [min, max];
                newValue[1] = +e.target.value;
                onChange?.(newValue);
              }}
            />
          </div>
          <span className="range-display">
            {Array.isArray(value) ? value[0] || min : min} -{" "}
            {Array.isArray(value) ? value[1] || max : max}
          </span>
        </div>
      )}

      {type === "select" && (
        <select
          className={styles.select}
          value={value as string}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
