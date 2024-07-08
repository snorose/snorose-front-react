import styles from './PostBar.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import timeAgo from '../../utils/timeAge.js';


export default function PostBar({ data }) {
  const givenTime = data.createdAt;
  const agoTime = timeAgo(givenTime);
  
  return (
    <div className={styles.post}>
      <div className={styles.post_top}>
        <div className={styles.profile}>
          <Icon id='profile' />
        </div>
        <p className={styles.name}>{data.userDisplay}</p>
        <p className={styles.time}>{agoTime}</p>
        {data.notice ? <p className={styles.edited}>(수정됨)</p> : null}
        <div className={styles.more_option}>
          <Icon id='more-option' />
        </div>
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>post_id로 텍스트 받아와서 표시?</p>
      </div>
      <div className={styles.post_bottom}>
        <div className={styles.comment_icon}>
          <Icon id='comment' />
        </div>
        <p className={styles.comment_cnt}>{data.viewCount}</p>
        <div className={styles.like_icon}>
          <Icon id='blank-heart' />
        </div>
        <p className={styles.like_cnt}>{data.likeCount}</p>
      </div>
    </div>
  );
}
