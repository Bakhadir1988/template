import { MenuSection } from '@/shared/types/menuType';
import { Menu } from '@/shared/ui';

import styles from './header.module.css';

interface HeaderProps {
  data?: MenuSection[] | null;
}

export const Header: React.FC<HeaderProps> = ({ data = [] }) => {
  return (
    <header className={styles.root}>
      <div className="container">
        <Menu sections={data || []} />
      </div>
    </header>
  );
};
