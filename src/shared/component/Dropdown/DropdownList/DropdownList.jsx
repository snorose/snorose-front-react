import { Icon } from '@/shared/component';

import styles from './DropdownList.module.css';

export default function DropdownList({ options, select, onSelect }) {
  return (
    <ul className={styles.dropdownContent}>
      {options.map((option) => (
        <li
          className={`${styles.option} ${select?.id === option.id ? styles.selected : ''}`}
          key={option.id}
          onClick={() => {
            onSelect(option);
          }}
        >
          {option?.name}
          {select?.id === option.id && (
            <Icon id='check' width={14} height={11} />
          )}
        </li>
      ))}
    </ul>
  );
}
