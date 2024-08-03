import { Icon } from '../../Icon';
import timeAgo from '../../../utils/timeAgo.js';
import styles from '../Comment/Comment.module.css';

export default function NestedComment({ data, isLast }) {
  const {
    id,
    postId,
    userProfile,
    userDisplay,
    isWriter,
    content,
    likeCount,
    reportCount,
    createdAt,
    updatedAt,
    deletedAt,
    isVisible,
    isUpdated,
    isDeleted,
    parentId,
    children,
  } = data;

  return (
    <div
      className={styles.nested_comment}
      style={{ borderBottom: isLast ? '1px solid #c7c7c7' : 'none' }}
    >
      <div
        className={styles.comment}
        style={{ borderBottom: isLast ? 'none' : '1px solid #c7c7c7' }}
      >
        <div className={styles.comment_top}>
          <div className={styles.comment_left}>
            <div className={styles.profile_icon}>
              <Icon id='profile' />
            </div>
            <p className={styles.name}>{userDisplay}</p>
          </div>
          <div className={styles.comment_right}>
            <div className={styles.like_icon}>
              <Icon id='blank-heart' />
            </div>
            <p className={styles.cnt_num}>{likeCount}</p>
            <div className={styles.more_option}>
              <Icon id='more-option' fill='#5F86BF' />
            </div>
          </div>
        </div>
        <p className={styles.comment_text}>{content}</p>
        <p className={styles.comment_time}>
          {isUpdated ? timeAgo(updatedAt) + ' (수정됨)' : timeAgo(createdAt)}
        </p>
      </div>
    </div>
  );
}
