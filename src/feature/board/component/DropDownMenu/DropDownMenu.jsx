import { useState } from 'react';

import styles from './DropDownMenu.module.css';

export default function DropDownMenu({
  options,
  item,
  setItem,
  dropDownOpen,
  setDropDownOpen,
  backgroundColor,
}) {
  const [selected, setSelected] = useState(item);

  const handleItemClick = (item) => {
    setSelected(item);
    setItem(item);
    setDropDownOpen(false);
  };

  return (
    <div
      className={dropDownOpen ? styles.container : styles.invisible}
      style={{ backgroundColor: backgroundColor }}
    >
      {options.map((item, index) => (
        <div
          key={index}
          className={
            item === selected ? styles.SelectedlistBar : styles.listBar
          }
          onClick={() => handleItemClick(item)}
        >
          <p className={styles.item}>{item}</p>
        </div>
      ))}
    </div>
  );
}
