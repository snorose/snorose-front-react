import { MenuIcon } from '@/components/MenuIcon';

import styles from './AppBar.module.css';

export default function AppBar({ title }) {
  return (
    <div className={styles.appBar}>
      <h2 className={styles.title}>{title}</h2>
      <MenuIcon />
    </div>
  );
}
