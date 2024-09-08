import styles from './Button.module.css';

export default function Button({ className, onClick, children }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
