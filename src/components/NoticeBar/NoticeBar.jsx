import { Icon } from '@/components/Icon';

import { dateFormat } from '@/utils';

import styles from './NoticeBar.module.css';

export default function NoticeBar({ data, onClick }) {
  const formattedDate = dateFormat(data.createdAt);

  return (
    <div className={styles.post} onClick={onClick}>
      <div className={styles.post_top}>
        <p className={styles.title}>{data.title}</p>
      </div>
      <div className={styles.post_center}>
        <p className={styles.text}>{data.content}</p>
      </div>
      <div className={styles.postBottom}>
        <span>{formattedDate}</span>
        <div className={styles.postBottomRight}>
          <Icon id='comment' width={13} height={11} fill='#D9D9D9' />
          <span className={styles.comment_cnt}>
            {data.commentCount.toLocaleString()}
          </span>
          <Icon id='like' width={12} height={11} fill='#D9D9D9' />
          <span className={styles.like_cnt}>
            {data.likeCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
