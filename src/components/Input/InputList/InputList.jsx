import styles from './InputList.module.css';

export default function InputList({ className, children }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
