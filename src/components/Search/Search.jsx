import { useState } from 'react';
import { Icon } from '../Icon';
import styles from './Search.module.css';

export default function Search({ placeholder, onSearch }) {
  const [text, setText] = useState('');
  const handleSearch = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Icon id='search' width={14} height={14} stroke='#898989' />
      <input
        className={styles.search}
        type='text'
        placeholder={placeholder}
        value={text}
        onChange={handleSearch}
      />
    </div>
  );
}
