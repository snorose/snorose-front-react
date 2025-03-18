import { MenuIcon } from '@/shared/component';

import styles from './AppBar.module.css';

export default function AppBar({ title, backgroundColor, notFixed }) {
  return (
    <div
      className={styles.appBar}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
        position: notFixed ? 'relative' : 'fixed',
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      <MenuIcon />
    </div>
  );
}
