import { Icon } from '@/components/Icon';
import styles from './Search.module.css';

export default function Search({
  className,
  placeholder,
  keyword,
  setKeyword,
  isAllSearch,
}) {
  const handleChange = (event) => {
    if (!isAllSearch) {
      setKeyword(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setKeyword(event.target.value);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <Icon id='search' width={14} height={14} stroke='#898989' />
      <input
        className={styles.search}
        type='text'
        value={keyword}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
