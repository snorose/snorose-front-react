import { Badge, Icon } from '@/shared/component';
import styles from './AccordionListItem.module.css';

export default function AccordionListItem({ list, listName }) {
  return (
    <ul className={styles.list}>
      {list.map((content) => (
        <li key={content.name} className={styles.item}>
          {content.name === '블랙리스트' ? (
            <Icon
              className={styles.icon}
              id='black-cloud'
              width={28}
              height={17}
            />
          ) : (
            <Icon className={styles.icon} id='cloud' width={28} height={17} />
          )}
          <div className={styles.itemContainer}>
            <span className={styles.name}>
              {content.name}
              {content.badge && (
                <Badge userRoleId={content.role} className={styles.badge} />
              )}
            </span>
            {listName === 'SNOROSE_HISTORY' ? <p>-</p> : <p>:</p>}
            <span className={styles.description}>{content.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
