import { Icon } from '@/shared/component';

import styles from './SelectedItem.module.css';

export default function SelectedItem({
  select,
  placeholder,
  isOpen,
  onClick,
  color,
  backgroundColor,
}) {
  return (
    <div
      className={`${styles.dropdown} ${isOpen && styles.open}`}
      style={{
        backgroundColor: !isOpen && select?.name && backgroundColor,
        color: !isOpen && select?.name && color,
      }}
    >
      <div
        className={`${styles.select} ${select || styles.unselect}`}
        onClick={onClick}
      >
        {select?.name ?? (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <Icon id='arrow-down' width={16} height={9} />
      </div>
    </div>
  );
}
