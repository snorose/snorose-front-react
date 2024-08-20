import { useState } from 'react';

import { Icon } from '@/components/Icon';

import styles from './DropDownBlue.module.css';

export default function DropDownBlue({ options, placeholder, select, setFn }) {
  const [isOpen, setIsOpen] = useState(false);
  const updateSelect = (event) => {
    setFn(JSON.parse(event.target.dataset.value));
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdown} ${isOpen && styles.open}`}>
      <div
        className={`${styles.select} ${select || styles.unselect}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon
          id={isOpen ? 'angle-up-blue' : 'angle-down-blue'}
          width='8'
          height='5'
        />
        <span className={styles.displayOption}>
          {select?.name ?? placeholder}
        </span>
      </div>
      <ul className={styles.list}>
        <li
          className={styles.option}
          key={placeholder}
          onClick={() => {
            setFn(undefined);
            setIsOpen(false);
          }}
        >
          {placeholder}
        </li>
        {options.map((option) => (
          <li
            className={styles.option}
            key={option.id}
            data-value={JSON.stringify(option)}
            onClick={updateSelect}
          >
            {option?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
