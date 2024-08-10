import styles from './ReviewContentItem.module.css';

export default function ReviewContentItem({ tag, value }) {
  return (
    <div className={styles.item}>
      <span className={styles.tag}>{tag}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
