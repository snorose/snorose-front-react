import styles from './InputLayout.module.css';

export default function InputLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
