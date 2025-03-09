import styles from './PrimaryButton.module.css';

export default function PrimaryButton({ className, onClick, children }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
