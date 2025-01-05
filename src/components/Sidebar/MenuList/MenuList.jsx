import { Link } from 'react-router-dom';

import styles from './MenuList.module.css';

export default function MenuList({ className, items }) {
  if (!items) return null;

  return (
    <ul className={styles.list}>
      {items.map(({ to, name }) => (
        <Link to={to} key={name} className={styles.item}>
          <li className={className}>{name}</li>
        </Link>
      ))}
    </ul>
  );
}
