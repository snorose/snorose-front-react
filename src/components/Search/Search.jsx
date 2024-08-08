import { useState, useEffect } from 'react';
import { Icon } from '../Icon';
import styles from './Search.module.css';

export default function Search({ className, placeholder, onSearch, keyWord }) {
  const [text, setText] = useState(keyWord || '');

  useEffect(() => {
    setText(keyWord || '');
  }, [keyWord]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(text);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <Icon id='search' width={14} height={14} stroke='#898989' />
      <input
        className={styles.search}
        type='text'
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
