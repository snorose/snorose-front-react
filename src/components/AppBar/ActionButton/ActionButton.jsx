import styles from './ActionButton.module.css';

export default function ActionButton({ onClick, children, ...rest }) {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
