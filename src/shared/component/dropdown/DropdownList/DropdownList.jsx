import { Icon } from '@/shared/component';

import styles from './DropdownList.module.css';

export default function DropdownList({
  options,
  select,
  onSelect,
  className = '',
}) {
  return (
    <ul className={`${styles.dropdownContent} ${className}`}>
      {options.map((option) => (
        <li
          key={option.id}
          className={`${styles.option} ${
            select?.id === option.id ? styles.selected : ''
          }`}
          onClick={() => onSelect(option)}
        >
          {option.name}
          {select?.id === option.id && (
            <Icon id='check' width={14} height={11} />
          )}
        </li>
      ))}
    </ul>
  );
}
