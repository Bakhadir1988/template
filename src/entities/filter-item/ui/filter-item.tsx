import React from "react";
import styles from "./filter-item.module.scss";

interface FilterItemProps {
  type: "checkbox" | "range" | "select" | "toggle";
  label: string;
  value?: any;
  onChange?: (value: any) => void;
  options?: string[];
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
    const newValue = checked
      ? [...value, option]
      : value.filter((item: string) => item !== option);
    onChange(newValue);
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
                checked={value.includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {type === "range" && (
        <div className="range-group">
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={(e) => onChange([+e.target.value, value[1]])}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={(e) => onChange([value[0], +e.target.value])}
          />
          <span>
            {value[0]} - {value[1]}
          </span>
        </div>
      )}

      {type === "select" && (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
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
