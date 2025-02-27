import { Icon } from '@/shared/component';
import { timeAgo, convertHyperlink } from '@/shared/lib';
import { LIKE_TYPE } from '@/shared/constant';

import { useCommentContext } from '@/contexts/CommentContext.jsx';
import { useLike } from '@/hooks';

import styles from '../Comment.module.css';

export default function NestedComment({
  data,
  isLast,
  isFirst,
  onCommentOptionClick,
}) {
  const { commentId } = useCommentContext();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.comment,
    sourceId: data.id,
  });

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
  } = data;

  return (
    <div
      className={`${styles.nestedComment} ${isLast && styles.isLast}`}
      onClick={(event) => event.stopPropagation()}
      style={{
        backgroundColor: commentId === data.id ? '#DDEBF6' : '#f0f0f0',
      }}
    >
      <div className={styles.nestedCommentTop}>
        <div className={styles.commentTopLeft}>
          <div className={styles.nestedIcon}>
            {isFirst && <Icon id='nested-arrow' width={15} height={15} />}
          </div>
          <div className={styles.cloud}>
            <Icon id='cloud' width={19} heigth={13} />
          </div>
          <p className={`${isWriterWithdrawn && styles.isWriterWithdrawn}`}>
            {isWriterWithdrawn ? '(알 수 없음)' : userDisplay}
          </p>
          <p className={styles.dot}>·</p>
          <p>
            {timeAgo(createdAt)} {isUpdated ? ' (수정됨)' : null}
          </p>
        </div>
        <p className={styles.dot3} onClick={(e) => onCommentOptionClick(data)}>
          {!isDeleted && isVisible && (
            <Icon id='ellipsis-vertical' width={3} height={11} />
          )}
        </p>
      </div>
      <div className={styles.commentCenter}>
        <div
          className={`${styles.nestedPadding} ${(isDeleted || !isVisible) && styles.hide}`}
        >
          {!isDeleted &&
            (isVisible ? (
              <p
                className={styles.content}
                dangerouslySetInnerHTML={convertHyperlink(content)}
              ></p>
            ) : (
              '(관리자에 의해 차단된 댓글입니다)'
            ))}
          {isDeleted && '(삭제된 댓글입니다)'}
        </div>
      </div>
      <div className={styles.commentBottom}>
        {!isDeleted && (
          <button
            className={styles.likedCount}
            type='button'
            onClick={() => (isLiked ? unlike.mutate() : like.mutate())}
          >
            <Icon
              id='like'
              width={13}
              height={12}
              fill={isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <span>{likeCount.toLocaleString()}</span>
          </button>
        )}
      </div>
    </div>
  );
}
