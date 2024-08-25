import { Icon } from '../Icon/index.js';
import styles from './NoticeBar.module.css';

export default function NoticeBar({ data, onClick }) {
  const date = new Date(data.createdAt);
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ' .');

  return (
    <div className={styles.post} onClick={onClick}>
      <div className={styles.post_top}>
        <p className={styles.title}>{data.title}</p>
        <div className={styles.more_option}>
          <Icon id='ellipsis-vertical' width={3} height={11} fill='#484848' />
        </div>
      </div>
      <div className={styles.post_center}>
        <p className={styles.text}>{data.content}</p>
      </div>
      <div className={styles.postBottom}>
        <div className={styles.postBottomLeft}>{formattedDate}</div>
        <div className={styles.postBottomRight}>
          <Icon id='comment' width={13} height={11} fill='#D9D9D9' />
          <span className={styles.comment_cnt}>
            {data.commentCount.toLocaleString()}
          </span>
          <Icon
            id='like'
            width={12}
            height={11}
            fill={data.liked ? '#5F86BF' : '#D9D9D9'}
          />
          <span className={styles.like_cnt}>
            {data.likeCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
