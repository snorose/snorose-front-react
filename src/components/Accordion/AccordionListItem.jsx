import { Icon } from '@/components/Icon';

import styles from './AccordionListItem.module.css';

export default function AccordionListItem({ list }) {
  return (
    <ul className={styles.list}>
      {list.map((history) => (
        <li className={styles.item}>
          <Icon className={styles.icon} id='cloud' width={28} height={17} />
          <p className={styles.description}>{history}</p>
        </li>
      ))}
    </ul>
  );
}
