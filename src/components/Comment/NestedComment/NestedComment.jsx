import { useState, useEffect } from 'react';

import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useLike, useComment } from '@/hooks';

import { DeleteModal, OptionModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';

import timeAgo from '@/utils/timeAgo.js';

import styles from '../Comment/Comment.module.css';

export default function NestedComment({
  data,
  isLast,
  isFirst,
  onCommentOptionClick,
}) {
  const { setIsEdit, commentId, setCommentId, setContent, inputFocus } =
    useCommentContext();
  const { deleteComment } = useComment();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { like, deleteLike } = useLike({ type: 'comments', typeId: data.id });

  const onCloseClick = () => {
    setCommentId(undefined);
    setContent('');
  };

  const {
    id,
    postId,
    userDisplay,
    isWriter,
    isWriterWithdrawn,
    content,
    isLiked,
    likeCount,
    createdAt,
    updatedAt,
    isVisible,
    isUpdated,
    isDeleted,
    // isLiked,
    children,
  } = data;

  return (
    <>
      <div
        className={styles.nestedComment}
        onClick={(e) => e.stopPropagation()}
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

          <p className={styles.dot3} onClick={() => onCommentOptionClick(data)}>
            {isWriter && !isDeleted && (
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
          <button className={styles.likedCount}>
            <Icon
              id='like'
              width='13'
              height='12'
              fill={isLiked ? '#5F86BF' : '#D9D9D9'}
              onClick={() => (isLiked ? deleteLike.mutate() : like.mutate())}
            />
            <span>{data.likeCount.toLocaleString()}</span>
          </button>
        </div>
      </div>
      <OptionModal
        id='comment-edit'
        isOpen={isOptionModalOpen}
        setIsOpen={setIsOptionModalOpen}
        closeFn={onCloseClick}
        functions={{
          pencil: () => {
            setIsOptionModalOpen(false);
            setIsEdit(true);
            inputFocus();
          },
          trash: () => {
            setIsDeleteModalOpen(true);
            setIsOptionModalOpen(false);
          },
        }}
      />
      <DeleteModal
        id='comment-delete'
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        redBtnFunction={() => {
          deleteComment.mutate({ commentId });
          setCommentId(undefined);
          setContent('');
        }}
      />
    </>
  );
}
