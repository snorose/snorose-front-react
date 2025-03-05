import { Link } from 'react-router-dom';

import { Icon } from '@/shared/component';
import { timeAgo, getBoardTextId } from '@/shared/lib';

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
}) {
  const imgSrc = image ? require(`../../dummy/images/${image}`) : '';

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
              <span>{displayName}</span>
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
