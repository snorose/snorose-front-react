import styles from './Filters.module.css';

export default function Filters({ children }) {
  return <div className={styles.filters}>{children}</div>;
}
