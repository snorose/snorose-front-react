import styles from './PostBar.module.css';
import Icon from '../../components/Icon/Icon.jsx';

function timeAgo(date) {
  const currentDate = new Date();
  const givenDate = new Date(date);
  const seconds = Math.floor((currentDate - givenDate) / 1000);

  if (seconds < 60) {
    return seconds + '초 전';
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes + '분 전';
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours + '시간 전';
  }
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days + '일 전';
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return months + '개월 전';
  }

  const years = Math.floor(months / 12);
  return years + '년 전';
}



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
