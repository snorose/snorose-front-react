import styles from './Component.module.css';

export function Heading({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export function Content({ children }) {
  return <p className={styles.content}>{children}</p>;
}
