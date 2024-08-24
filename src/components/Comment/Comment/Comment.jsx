import { useState, useEffect } from 'react';

import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useToast, useLike, useComment } from '@/hooks';

import { DeleteModal, OptionModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { NestedComment } from '@/components/Comment';

import timeAgo from '@/utils/timeAgo.js';

import { TOAST } from '@/constants';

import styles from './Comment.module.css';

export default function Comment({ data }) {
  const { setIsEdit, commentId, setCommentId, setContent, inputFocus } =
    useCommentContext();
  const { deleteComment, refetch } = useComment();
  const { toast } = useToast();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 좋아요 훅 사용
  const {
    isLiked,
    toggleLike,
    error: likeError,
  } = useLike('comments', data.id, data?.isLiked, refetch);

  // 좋아요 처리 시 에러 메시지 표시
  useEffect(() => {
    if (likeError?.response?.status === 403) {
      toast(TOAST.LIKE_SELF_ERROR);
    }
  }, [likeError]);

  const onCommentOptionClick = ({ id, parentId, content }) => {
    setCommentId(id);
    setContent(content);
    setIsOptionModalOpen(true);
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

  return (
    <>
      <div className={styles.comment} onClick={() => setCommentId(undefined)}>
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
            onClick={(e) => {
              e.stopPropagation();
              onCommentOptionClick(data);
            }}
          >
            {data.isWriter && (
              <Icon id='ellipsis-vertical' width='3' height='11' />
            )}
          </p>
        </div>
        <div className={styles.commentCenter}>{data.content}</div>
        <div className={styles.commentBottom}>
          <button className={styles.commentCount} onClick={handleReply}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{data.children.length}</p>
          </button>
          <button className={styles.likedCount} onClick={toggleLike}>
            <Icon
              id='like'
              width='13'
              height='12'
              fill={isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{data.likeCount}</p>
          </button>
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
