import styles from './ShimmerEffect.module.css';

export default function ShimmerEffect({ children }) {
  return <div className={styles.effect}>{children}</div>;
}
