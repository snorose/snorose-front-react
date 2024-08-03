import styles from './Comment.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import timeAgo from '../../utils/timeAgo.js';
import { useState } from 'react';

export default function NestedComment({ data, isLast }) {
  const {
    id,
    postId,
    userProfile,
    userDisplay,
    isWriter,
    content,
    liked, // 백엔드에서 추가 필요
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
    <div
      className={styles.nestedComment}
      style={{
        paddingBottom: isLast ? '6px' : 'none',
        borderBottomLeftRadius: isLast ? '5px' : '0px',
        borderBottomRightRadius: isLast ? '5px' : '0px',
      }}
    >
      <div className={styles.commentTop}>
        <div className={styles.commentTopLeft}>
          <div className={styles.nestedIcon}>
            {!isLast && <Icon id='nested-arrow' width='15' height='15' />}
          </div>

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
      <div className={styles.commentCenter}>
        <div className={styles.nestedPadding}>{content}</div>
      </div>
      <div className={styles.commentBottom}>
        <div className={styles.count}>
          <Icon
            id='like'
            width='13'
            height='12'
            fill={isLiked ? '#5F86BF' : '#D9D9D9'}
            onClick={handleLikedClick}
          />
          <p>{likeCount}</p>
        </div>
      </div>
    </div>
  );
}
