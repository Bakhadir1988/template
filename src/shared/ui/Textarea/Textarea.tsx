'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((
  { error, label, fullWidth = false, className = '', ...props },
  ref
) => {
  const textareaClasses = [
    styles.textarea,
    error ? styles.error : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea ref={ref} className={textareaClasses} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';