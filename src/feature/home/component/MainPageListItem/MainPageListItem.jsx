import { Link } from 'react-router-dom';

import { Icon, Badge } from '@/shared/component';
import { timeAgo, getBoardTextId } from '@/shared/lib';
import { ROLE } from '@/shared/constant';

import styles from './MainPageListItem.module.css';

export default function MainPageListItem({
  postId,
  displayName,
  createdAt,
  title,
  overview,
  boardId,
  boardName,
  image,
  userRoleId,
}) {
  const imgSrc = image ? require(`@/dummy/images/${image}`) : '';

  // 뱃지가 보이는 ROLE
  const showBadge =
    userRoleId === ROLE.official ||
    (userRoleId === ROLE.admin && displayName !== '익명송이');

  return (
    <Link
      className={styles.link}
      to={`/board/${getBoardTextId(boardId)}/post/${postId}`}
    >
      <li className={styles.item}>
        <div className={styles.left}>
          <div className={styles.top}>
            <Icon id='cloud' width={19} height={12} />
            <p className={styles.meta}>
              <span className={styles.name}>
                {displayName}
                {showBadge && (
                  <Badge userRoleId={userRoleId} className={styles.badge} />
                )}
              </span>
              <span className={styles.dot}></span>
              <span>{timeAgo(createdAt)}</span>
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.overview}>{overview}</p>
            </div>
            <span className={styles.boardName}>{boardName}</span>
          </div>
        </div>
        {image && (
          <div className={styles.right}>
            <img src={imgSrc} alt='besookt' />
          </div>
        )}
      </li>
    </Link>
  );
}
