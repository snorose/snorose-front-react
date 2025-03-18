import { Icon } from '@/shared/component';

import styles from './AccordionListItem.module.css';

export default function AccordionListItem({ list }) {
  return (
    <ul className={styles.list}>
      {list.map((history) => (
        <li key={history} className={styles.item}>
          <Icon className={styles.icon} id='cloud' width={28} height={17} />
          <p className={styles.description}>{history}</p>
        </li>
      ))}
    </ul>
  );
}
