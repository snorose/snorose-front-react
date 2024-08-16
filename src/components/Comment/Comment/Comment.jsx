import styles from './Comment.module.css';
import { Icon } from '../../../components/Icon';
import { NestedComment } from '../';
import timeAgo from '../../../utils/timeAgo.js';
import { useState } from 'react';

export default function Comment({
  data,
  onCommentClick,
  onCommentOptionClick,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikedClick = () => {
    console.log('API로 liked 데이터 수정');
  };

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick();
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentTop}>
        <div className={styles.commentTopLeft}>
          <div className={styles.cloud}>
            <Icon id='cloud' width='19' height='13' />
          </div>
          <p>{data.userDisplay}</p>
          <p className={styles.dot}>·</p>
          <p>
            {timeAgo(data.createdAt)} {data.isUpdated ? ' (수정됨)' : null}
          </p>
        </div>
        <p
          className={styles.dot3}
          onClick={() => onCommentOptionClick(data.id)}
        >
          <Icon id='ellipsis-vertical' width='3' height='11' />
        </p>
      </div>
      <div className={styles.commentCenter}>{data.content}</div>
      <div className={styles.commentBottom}>
        <div className={styles.commentCount} onClick={handleCommentClick}>
          <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
          <p>{data.children.length}</p>
        </div>
        <div className={styles.likedCount}>
          <Icon id='like' width='13' height='12' fill='#D9D9D9' />
          <p>{data.likeCount}</p>
        </div>
      </div>
      {data.children.length > 0 &&
        data.children.map((childComment, index) => (
          <NestedComment
            key={childComment.id}
            data={childComment}
            isLast={index === data.children.length - 1}
            isFirst={index === 0}
            onCommentOptionClick={onCommentOptionClick}
          />
        ))}
    </div>
  );
}
