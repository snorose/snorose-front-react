import { Icon } from '@/shared/component';

import styles from './DropdownList.module.css';

export default function DropdownList({ options, select, onSelect }) {
  return (
    <ul
      className={styles.dropdownContent}
      style={{
        border: '2px solid red',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
        position: 'absolute',
        top: '100%',
      }}
    >
      {options.map((option) => (
        <li
          className={`${styles.option} ${select?.id === option.id ? styles.selected : ''}`}
          key={option.id}
          onClick={() => {
            console.log('Option clicked:', option);
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
