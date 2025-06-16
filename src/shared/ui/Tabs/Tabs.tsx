'use client';

import { ReactNode, useState } from 'react';
import styles from './Tabs.module.scss';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  className?: string;
}

export const Tabs = ({
  tabs,
  defaultActiveTab,
  className = '',
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.panels}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.panel} ${activeTab === tab.id ? styles.active : ''}`}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};