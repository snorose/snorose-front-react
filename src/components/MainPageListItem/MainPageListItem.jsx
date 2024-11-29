import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks';

import { Icon } from '@/components/Icon';

import { timeAgo, getBoardTextId } from '@/utils';

import { USER_STATUS } from '@/constants';

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
  roles,
}) {
  const { status, userInfo } = useAuth();
  const [agoTime, setAgoTime] = useState(timeAgo(createdAt));

  // timeAgo를 1분마다 업데이트
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAgoTime(timeAgo(createdAt));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  if (status === USER_STATUS.isLogout) {
    return (
      <li className={`${styles.item} ${styles.denied}`}>
        로그인 후 이용 가능합니다.
      </li>
    );
  }

  if (!roles.includes(userInfo?.userRoleId)) {
    return (
      <li className={`${styles.item} ${styles.denied}`}>
        등업 완료 후 이용 가능합니다.
      </li>
    );
  }

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
              <span>{agoTime}</span>
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
