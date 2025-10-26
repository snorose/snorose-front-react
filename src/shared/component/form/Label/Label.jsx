import styles from './Label.module.css';

export default function Label({ htmlFor, children, required = false }) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
      {required && <span className={styles.required}></span>}
    </label>
  );
}
