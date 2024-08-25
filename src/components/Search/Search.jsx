import { Icon } from '@/components/Icon';
import styles from './Search.module.css';

export default function Search({ className, placeholder, handleKeyDown }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <Icon id='search' width={14} height={14} stroke='#898989' />
      <input
        className={styles.search}
        type='text'
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
