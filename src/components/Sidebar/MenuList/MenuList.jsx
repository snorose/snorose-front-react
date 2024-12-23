import { Link } from 'react-router-dom';

import styles from './MenuList.module.css';

export default function MenuList({ className, items, onItemClick }) {
  if (!items) return null;

  return (
    <ul className={styles.list}>
      {items.map(({ to, name }) => (
        <Link to={to} key={name} className={styles.item} onClick={onItemClick}>
          <li className={className}>{name}</li>
        </Link>
      ))}
    </ul>
  );
}
