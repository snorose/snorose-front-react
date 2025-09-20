import { Badge, Icon } from '@/shared/component';
import styles from './AccordionListItem.module.css';

import cloudLogo from '@/assets/images/cloudLogo.svg';
import blackCloudLogo from '@/assets/images/blackCloudLogo.svg';

export default function AccordionListItem({ list, listName }) {
  return (
    <ul className={styles.list}>
      {list.map((content) => (
        <li key={content.name} className={styles.item}>
          {content.name === '블랙리스트' ? (
            <img className={styles.icon} src={blackCloudLogo} alt='블랙로고' />
          ) : (
            <img className={styles.icon} src={cloudLogo} alt='로고' />
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
