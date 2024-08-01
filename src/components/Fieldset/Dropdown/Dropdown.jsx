import { useState } from 'react';
import Icon from '../../Icon/Icon.jsx';
import styles from './Dropdown.module.css';

export default function Dropdown({ options, placeholder, select, setFn }) {
  const [isOpen, setIsOpen] = useState(false);
  const updateSelect = (event) => {
    setFn(event.target.innerText);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdown} ${isOpen && styles.open}`}>
      <div
        className={`${styles.select} ${select || styles.unselect}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {select ?? placeholder}
        <Icon id='arrow-down' width={13} height={8} stroke='#000000' />
      </div>
      <ul className={styles.list}>
        {options.map((option) => (
          <li className={styles.option} key={option} onClick={updateSelect}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
