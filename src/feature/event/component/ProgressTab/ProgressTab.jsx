import styles from './ProgressTab.module.css';

export default function ProgressTab({
  progressType,
  isSelected = false,
  onClick,
}) {
  const active = isSelected ? styles.active : '';

  return (
    <button className={`${styles.box} ${active}`} onClick={onClick}>
      {progressType}
    </button>
  );
}
