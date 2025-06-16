import styles from "./Input.module.scss";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.root,
        className,
        fullWidth ? styles.full_width : ""
      )}
    >
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={clsx(styles.input, error ? styles.error : "")}
        {...props}
      />
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
};
