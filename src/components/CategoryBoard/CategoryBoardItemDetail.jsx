import PROFILE from '../../dummy/images/profile.png';
import styles from './CategoryBoardItemDetail.module.css';

export default function CategoryBoardItemDetail({
  profile,
  nickname,
  title,
  overview,
  boardName,
  timeAgo,
  image,
}) {
  const imgSrc = image ? require(`../../dummy/images/${image}`) : '';

  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <div className={styles.profileWrapper}>
          <img className={styles.profile} src={PROFILE} alt='profile' />
          <p className={styles.nickname}>{nickname}</p>
        </div>
        <span className={styles.timeAgo}>{timeAgo}</span>
      </div>
      <div className={styles.middle}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.overview}>{overview}</p>
        </div>
        {image && <img src={imgSrc} alt='preview' />}
      </div>
      <span className={styles.boardName}>{boardName}</span>
    </li>
  );
}
