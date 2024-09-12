import { Icon } from '@/components/Icon';
import styles from './Modal.module.css';

export default function Options({ options, functions, onOptionClick }) {
  const handleClick = (iconId) => {
    if (iconId && functions !== undefined && functions[iconId]) {
      functions[iconId]();
    }
  };

  return (
    <div className={styles.options}>
      {options.map((option) => (
        <div
          className={styles.optionBar}
          key={option.iconId}
          data-value={option.value}
          onClick={(event) => {
            event.stopPropagation();
            handleClick(option.iconId);

            if (onOptionClick !== undefined) {
              onOptionClick(event);
            }
          }}
        >
          <div className={styles.iconBox}>
            <Icon
              id={option.iconId}
              width={option.IconWidth}
              height={option.IconHeight}
            />
          </div>
          <div
            className={styles.optionText}
            style={{ color: option.color || 'inherit' }}
          >
            {option.text}
          </div>
        </div>
      ))}
    </div>
  );
}
