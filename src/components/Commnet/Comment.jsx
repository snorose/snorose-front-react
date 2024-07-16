import styles from './Comment.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import NestedComment from './NestedComment.jsx';
import { COMMENT_LIST } from '../../constants/commentDummy.js';
import timeAgo from '../../utils/timeAgo.js';

export default function Comment({ data }) {
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
    <>
      <div className={styles.comment}>
        <div className={styles.comment_top}>
          <div className={styles.comment_left}>
            <div className={styles.profile_icon}>
              <Icon id='profile' />
            </div>
            <p className={styles.name}>{userDisplay}</p>
          </div>
          <div className={styles.comment_right}>
            <div className={styles.comment_icon}>
              <Icon id='comment' />
            </div>
            <p className={styles.cnt_num}>3</p>
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
      {children.length > 0 &&
        children.map((childComment, index) => (
          <NestedComment
            key={childComment.id}
            data={childComment}
            isLast={index === children.length - 1}
          />
        ))}
    </>
  );
}
