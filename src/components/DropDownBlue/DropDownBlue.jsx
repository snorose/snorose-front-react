import { Icon } from '@/components/Icon';

import styles from './DropDownBlue.module.css';

export default function DropDownBlue({
  options,
  placeholder,
  select,
  setFn,
  name,
  isOpen,
  setIsOpen,
}) {
  const handleToggle = () => {
    setIsOpen((prev) => {
      for (const key in prev) {
        prev[key] = false;
      }
      return { ...prev, [name]: !isOpen };
    });
  };

  const updateSelect = (event) => {
    setFn(JSON.parse(event.target.dataset.value));
    handleToggle();
  };

  return (
    <div className={`${styles.dropdown} ${isOpen && styles.open}`}>
      <div
        className={`${styles.select} ${select || styles.unselect}`}
        onClick={handleToggle}
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
            handleToggle();
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
