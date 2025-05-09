import { Badge, Icon } from '@/shared/component';

import styles from './AccordionListItem.module.css';

export default function AccordionListItem({ list }) {
  return (
    <ul className={styles.list}>
      {list.map((history) => (
        <li key={history} className={styles.item}>
          <Icon className={styles.icon} id='cloud' width={28} height={17} />
          <div className={styles.itemContainer}>
            <span className={styles.name}>
              {history.name}
              {history.badge && (
                <Badge userRoleId={history.role} className={styles.badge} />
              )}
            </span>
            <span className={styles.description}>{history.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
