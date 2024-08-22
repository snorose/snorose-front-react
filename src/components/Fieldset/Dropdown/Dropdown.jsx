import { useState } from 'react';

import { Icon } from '@/components/Icon';

import styles from './Dropdown.module.css';

export default function Dropdown({ options, placeholder, select, setFn }) {
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
        {select?.name ?? placeholder}
        <Icon id='arrow-down' width={13} height={8} stroke='#000000' />
      </div>
      <ul className={styles.list}>
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
