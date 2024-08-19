import styles from '../Comment/Comment.module.css';
import { Icon } from '../../../components/Icon';
import timeAgo from '../../../utils/timeAgo.js';
import { useState } from 'react';

export default function NestedComment({
  data,
  isLast,
  isFirst,
  onCommentOptionClick,
}) {
  const [isLiked, setIsLiked] = useState(false);

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
      <div className={styles.nestedCommentTop}>
        <div className={styles.commentTopLeft}>
          <div className={styles.nestedIcon}>
            {isFirst && <Icon id='nested-arrow' width='15' height='15' />}
          </div>
          <div className={styles.cloud}>
            <Icon id='cloud' width='19' heigth='13' />
          </div>
          <p>{data.userDisplay}</p>
          <p className={styles.dot}>·</p>
          <p>
            {timeAgo(data.createdAt)} {data.isUpdated ? ' (수정됨)' : null}
          </p>
        </div>

        <p
          className={styles.dot3}
          onClick={() => onCommentOptionClick('comment', data.id, data.content)}
        >
          <Icon id='ellipsis-vertical' width='3' height='11' />
        </p>
      </div>
      <div className={styles.commentCenter}>
        <div className={styles.nestedPadding}>{data.content}</div>
      </div>
      <div className={styles.commentBottom}>
        <div className={styles.likedCount}>
          <Icon
            id='like'
            width='13'
            height='12'
            fill={isLiked ? '#5F86BF' : '#D9D9D9'}
            onClick={handleLikedClick}
          />
          <p>{data.likeCount}</p>
        </div>
      </div>
    </div>
  );
}
