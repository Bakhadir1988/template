'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { MenuSection } from '@/shared/types';

import styles from './menu.module.css';

interface MenuProps {
  sections: MenuSection[];
}

export const Menu: React.FC<MenuProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li
            key={section.item_id}
            className={styles.item}
            onMouseEnter={() => setActiveSection(section.item_id)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <Link href={section.url} className={styles.link}>
              {section.title}
            </Link>

            {section.sections && section.sections.length > 0 && (
              <div
                className={`${styles.dropdown} ${activeSection === section.item_id ? styles.active : ''}`}
              >
                <ul className={styles.dropdown_list}>
                  {section.sections.map((subSection) => (
                    <li
                      key={subSection.item_id}
                      className={styles.dropdown_item}
                    >
                      <Link
                        href={subSection.url}
                        className={styles.dropdown_link}
                      >
                        {subSection.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
