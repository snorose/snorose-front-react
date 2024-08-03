import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon.jsx';
import { USER } from '../../dummy/data';
import styles from './MainPageListItem.module.css';

export default function MainPageListItem({
  postId,
  displayName,
  createdAt,
  title,
  overview,
  boardName,
  image,
  roles,
}) {
  if (!USER?.isLogin) {
    return (
      <li className={`${styles.item} ${styles.denied}`}>
        로그인 후 이용 가능합니다.
      </li>
    );
  }

  if (!roles.includes(USER?.role)) {
    return (
      <li className={`${styles.item} ${styles.denied}`}>
        등업 완료 후 이용 가능합니다.
      </li>
    );
  }

  const imgSrc = image ? require(`../../dummy/images/${image}`) : '';

  return (
    <Link className={styles.link} to={`/board/besookt/${postId}`}>
      <li className={styles.item}>
        <div className={styles.left}>
          <div className={styles.top}>
            <Icon id='cloud' width={19} height={12} />
            <p className={styles.meta}>
              <span>{displayName}</span>
              <span className={styles.dot}></span>
              <span>{createdAt}</span>
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
