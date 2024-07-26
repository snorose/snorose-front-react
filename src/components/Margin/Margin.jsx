import styles from './Margin.module.css';

export default function Margin({ className, children }) {
  return <div className={`${styles.margin} ${className}`}>{children}</div>;
}
