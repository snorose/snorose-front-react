import styles from './Comment.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import NestedComment from './NestedComment.jsx';
import timeAgo from '../../utils/timeAgo.js';
import { useState } from 'react';

export default function Comment({ data }) {
  const {
    id,
    postId,
    userProfile,
    userDisplay,
    isWriter,
    content,
    liked,
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
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikedClick = () => {
    console.log('API로 liked 데이터 수정');
  };
  return (
    <div className={styles.comment}>
      <div className={styles.commentTop}>
        <div className={styles.commentTopLeft}>
          <div className={styles.cloud}>
            <Icon id='cloud' width='19' heigth='13' />
          </div>
          <p>{userDisplay}</p>
          <p className={styles.dot}>·</p>
          <p>
            {isUpdated ? timeAgo(updatedAt) + ' (수정됨)' : timeAgo(createdAt)}
          </p>
        </div>
        <Icon id='ellipsis-vertical' width='3' height='11' />
      </div>
      <div className={styles.commentCenter}>{content}</div>
      <div className={styles.commentBottom}>
        <div className={styles.count}>
          <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
          <p>3</p>
        </div>
        <div className={styles.count}>
          <Icon id='heart' width='13' height='12' fill='#D9D9D9' />
          <p>{likeCount}</p>
        </div>
      </div>
      {children.length > 0 &&
        children.map((childComment, index) => (
          <NestedComment
            key={childComment.id}
            data={childComment}
            isLast={index === children.length - 1}
          />
        ))}
    </div>
  );
}
