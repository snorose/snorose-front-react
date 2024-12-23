import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Icon } from '@/components';

import styles from './Filter.module.css';

export default function Filter({ filterKey, options, placeholder }) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get(filterKey);
  const { name: selectedOptionName } =
    options.find(({ id }) => id.toString() === selectedOption) ?? {};

  const updateOption = (event) => {
    const id = event.target.dataset.id;

    searchParams.set(filterKey, id);
    setSearchParams(searchParams);
  };

  const deleteOption = () => {
    searchParams.delete(filterKey);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const toggle = (event) => {
      if (ref.current.contains(event.target)) {
        setIsOpen((prev) => !prev);
      } else {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', toggle);

    return () => {
      document.removeEventListener('click', toggle);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.filter} ${isOpen && styles.open}`}>
      <div className={`${styles.display}`}>
        <Icon
          id={isOpen ? 'angle-up-blue' : 'angle-down-blue'}
          width={8}
          height={5}
        />
        <span className={styles.displayOption}>
          {selectedOptionName ?? placeholder}
        </span>
      </div>
      <ul className={styles.list}>
        <li
          className={styles.option}
          key={placeholder}
          onClick={() => deleteOption()}
        >
          {placeholder}
        </li>
        {options.map(({ id, name }) => (
          <li
            className={styles.option}
            key={id}
            data-id={id}
            onClick={updateOption}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
