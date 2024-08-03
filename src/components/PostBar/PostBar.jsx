import { Icon } from '../../components/Icon';
import timeAgo from '../../utils/timeAgo.js';
import styles from './PostBar.module.css';

export default function PostBar({ data }) {
  const givenTime = data.createdAt;
  const agoTime = timeAgo(givenTime);

  return (
    <div className={styles.post}>
      <div className={styles.post_top}>
        <Icon id='profile' width={15} height={15} />
        <p className={styles.name}>{data.userDisplay}</p>
        <p className={styles.dot}>·</p>
        <p>{agoTime}</p>
        {data.notice ? <p className={styles.edited}>&nbsp;(수정됨)</p> : null}
        <div className={styles.more_option}>
          <Icon id='more-option' width={3} height={11} fill='#484848' />
        </div>
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>
          post_id로 텍스트 받아와서 post_id로 텍스트 받아와서 post_id로 텍스트
          받아와서 post_id로 텍스트 받아와서 post_id로 텍스트 받아와서 post_id로
          텍스트 받아와서 post_id로 텍스트 받아와서 post_id로 텍스트 받아와서
          post_id로 텍스트 받아와서 post_id로 텍스트 받아와서
        </p>
      </div>
      <div className={styles.post_bottom}>
        <Icon id='comment' width={12} height={10} fill='#D9D9D9' />
        <p className={styles.comment_cnt}>{data.viewCount}</p>
        <Icon id='blank-heart' width={11} height={10} fill='#D9D9D9' />
        <p className={styles.like_cnt}>{data.likeCount}</p>
      </div>
    </div>
  );
}
