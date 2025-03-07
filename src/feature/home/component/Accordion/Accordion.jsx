import { useState } from 'react';

import { Icon } from '@/shared/component';

import styles from './Accordion.module.css';

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={`${styles.accordion} ${isOpen && styles.opend}`}>
      <div className={styles.panelHeader} onClick={toggle}>
        <span>{title}</span>
        <Icon
          className={styles.toggleIcon}
          id='blue-triangle'
          width={20}
          height={20}
        />
      </div>
      <div className={styles.panelBody}>{children}</div>
    </div>
  );
}
