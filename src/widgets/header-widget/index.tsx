import React from 'react';

import { Menu } from '@/shared';
import { getMenu } from '@/shared/api/menu.api';

import styles from './header-widget.module.scss';

export const HeaderWidget = async () => {
  const menu = await getMenu();

  return (
    <header className={styles.root}>
      <div className="container">
        <Menu sections={menu || []} />
      </div>
    </header>
  );
};
