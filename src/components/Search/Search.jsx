import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Icon } from '@/shared/component';

import styles from './Search.module.css';

export default function Search({ className, placeholder, onKeyDown }) {
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const search = (keyword) => {
    if (keyword === '') {
      searchParams.delete('keyword');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('keyword', keyword);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    ref.current.value = keyword;
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      <Icon id='search' width={14} height={14} />
      <input
        ref={ref}
        className={styles.search}
        type='text'
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') {
            return;
          }

          if (onKeyDown) {
            onKeyDown(event);
          }

          search(event.target.value);
        }}
      />
    </div>
  );
}
