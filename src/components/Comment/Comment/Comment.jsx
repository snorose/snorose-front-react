import { useState } from 'react';

import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useLike, useComment } from '@/hooks';

import { DeleteModal, OptionModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { NestedComment } from '@/components/Comment';

import { timeAgo } from '@/utils';

import styles from './Comment.module.css';

export default function Comment({ data }) {
  const { setIsEdit, commentId, setCommentId, setContent, inputFocus } =
    useCommentContext();
  const { deleteComment } = useComment();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { like, deleteLike } = useLike({ type: 'comments', typeId: data.id });

  const onCommentOptionClick = (data) => {
    setCommentId(data.id);
    setContent(data.content);
    data.isWriter ? setIsOptionModalOpen(true) : setIsReportModalOpen(true);
  };

  const onCloseClick = () => {
    setCommentId(undefined);
    setContent('');
  };

  const handleReply = (e) => {
    e.stopPropagation();
    setCommentId(data.id);
    inputFocus();
  };

  const {
    userDisplay,
    isWriter,
    isWriterWithdrawn,
    content,
    isLiked,
    likeCount,
    createdAt,
    isVisible,
    isUpdated,
    isDeleted,
    children,
  } = data;

  return (
    <>
      <div className={styles.comment} onClick={() => setCommentId(undefined)}>
        <div className={styles.commentTop}>
          <div className={styles.commentTopLeft}>
            <div className={styles.cloud}>
              <Icon id='cloud' width='19' height='13' />
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
        <div
          className={`${styles.commentCenter} ${(isDeleted || !isVisible) && styles.hide}`}
        >
          {!isDeleted &&
            (isVisible ? content : '(관리자에 의해 차단된 댓글입니다)')}
          {isDeleted && '(삭제된 댓글입니다)'}
        </div>
        <div className={styles.commentBottom}>
          {!isDeleted && (
            <>
              <button className={styles.commentCount} onClick={handleReply}>
                <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
                <p>{children.length}</p>
              </button>
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
            </>
          )}
        </div>
        {children.length > 0 &&
          children.map((childComment, index) => (
            <NestedComment
              key={childComment.id}
              data={childComment}
              isLast={index === children.length - 1}
              isFirst={index === 0}
              onCommentOptionClick={onCommentOptionClick}
            />
          ))}
      </div>
      <OptionModal
        id='comment-more-options'
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
      <OptionModal
        id='report'
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        closeFn={() => setIsReportModalOpen(false)}
      />
    </>
  );
}
