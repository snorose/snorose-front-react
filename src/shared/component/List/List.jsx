import styles from './List.module.css';

export default function List({ className, children }) {
  return <ul className={`${styles.list} ${className}`}>{children}</ul>;
}
