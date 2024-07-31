import styles from './CategoryFieldset.module.css';

export default function CategoryFieldset({ title, required, children }) {
  return (
    <div className={styles.field}>
      <div className={styles.header}>
        <span className={styles.title}>
          {title}
          {required && <span className={styles.required}></span>}
        </span>
      </div>
      <div className={styles.cagetories}>{children}</div>
    </div>
  );
}
