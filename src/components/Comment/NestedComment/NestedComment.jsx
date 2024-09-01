import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useLike } from '@/hooks';

import { Icon } from '@/components/Icon';

import { timeAgo } from '@/utils';

import styles from '../Comment/Comment.module.css';

export default function NestedComment({
  data,
  isLast,
  isFirst,
  onCommentOptionClick,
}) {
  const { setCommentId } = useCommentContext();

  const { like, deleteLike } = useLike({ type: 'comments', typeId: data.id });

  const {
    userDisplay,
    isWriterWithdrawn,
    content,
    isLiked,
    likeCount,
    createdAt,
    isVisible,
    isUpdated,
    isDeleted,
    // isLiked,
  } = data;

  return (
    <div
      className={styles.nestedComment}
      onClick={(e) => {
        e.stopPropagation();
        setCommentId(undefined);
      }}
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
          <p className={`${isWriterWithdrawn && styles.isWriterWithdrawn}`}>
            {isWriterWithdrawn ? '(알 수 없음)' : userDisplay}
          </p>
          <p className={styles.dot}>·</p>
          <p>
            {timeAgo(createdAt)} {isUpdated ? ' (수정됨)' : null}
          </p>
        </div>
        <p
          className={styles.dot3}
          onClick={(e) => {
            e.stopPropagation();
            onCommentOptionClick(data);
          }}
        >
          {!isDeleted && isVisible && (
            <Icon id='ellipsis-vertical' width='3' height='11' />
          )}
        </p>
      </div>
      <div className={styles.commentCenter}>
        <div
          className={`${styles.nestedPadding} ${(isDeleted || !isVisible) && styles.hide}`}
        >
          {!isDeleted &&
            (isVisible ? content : '(관리자에 의해 차단된 댓글입니다)')}
          {isDeleted && '(삭제된 댓글입니다)'}
        </div>
      </div>
      <div className={styles.commentBottom}>
        {!isDeleted && (
          <button
            className={styles.likedCount}
            onClick={() => (isLiked ? deleteLike.mutate() : like.mutate())}
          >
            <Icon
              id='like'
              width='13'
              height='12'
              fill={isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <span>{likeCount.toLocaleString()}</span>
          </button>
        )}
      </div>
    </div>
  );
}
