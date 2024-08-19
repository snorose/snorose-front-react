import React from 'react';
import styles from './Comment.module.css';
import { Icon } from '../../../components/Icon';
import { NestedComment } from '../';
import timeAgo from '../../../utils/timeAgo.js';

export default function Comment({
  data,
  onCommentClick,
  onCommentOptionClick,
}) {
  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick();
    }
  };

  const renderChildren = (children) => {
    return (
      children.length > 0 &&
      children.map((childComment, index) => (
        <div key={childComment.id} className={styles.nestedCommentWrapper}>
          <NestedComment
            data={childComment}
            isLast={index === children.length - 1}
            isFirst={index === 0}
            onCommentOptionClick={onCommentOptionClick}
          />
        </div>
      ))
    );
  };

  if (data.isDeleted) {
    return (
      <div className={styles.comment}>
        <div className={styles.deletedComment}>(삭제된 댓글입니다)</div>
        {renderChildren(data.children)}
      </div>
    );
  }

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
          onClick={() => onCommentOptionClick('comment', data.id, data.content)}
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
      {renderChildren(data.children)}
    </div>
  );
}
