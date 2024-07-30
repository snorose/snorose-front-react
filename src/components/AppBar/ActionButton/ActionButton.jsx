import styles from './ActionButton.module.css';

export default function ActionButton({ onClick, children }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
