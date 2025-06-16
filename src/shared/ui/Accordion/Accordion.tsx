'use client';

import { ReactNode, useState } from 'react';
import styles from './Accordion.module.scss';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className = '',
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const accordionClasses = [
    styles.accordion,
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={accordionClasses}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} />
      </button>
      <div className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};