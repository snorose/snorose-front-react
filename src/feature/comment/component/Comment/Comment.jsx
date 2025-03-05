import { forwardRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useModal, useToast } from '@/shared/hook';
import {
  ConfirmModal,
  DeleteModal,
  Icon,
  OptionModal,
} from '@/shared/component';
import { timeAgo, convertHyperlink } from '@/shared/lib';
import { MUTATION_KEY, LIKE_TYPE } from '@/shared/constant';

import { useCommentContext } from '@/feature/comment/context';
import { useComment } from '@/feature/comment/hook';
import { NestedComment } from '@/feature/comment/component';

import { reportComment } from '@/apis';
import { useLike } from '@/hooks';

import styles from './Comment.module.css';

const Comment = forwardRef((props, ref) => {
  const { pathname } = useLocation();
  const { data } = props;
  const {
    setIsEdit,
    commentId,
    setCommentId,
    setContent,
    inputFocus,
    resetCommentState,
  } = useCommentContext();
  const { deleteComment } = useComment();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.comment,
    sourceId: data.id,
  });
  const { toast } = useToast();

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState();
  const reportConfirmModal = useModal();

  const { mutate: reportCommentMutate } = useMutation({
    mutationKey: [MUTATION_KEY.reportComment],
    mutationFn: (body) => reportComment(data.postId, data.id, body),
    onSuccess: ({ message }) => {
      setIsReportModalOpen(false);
      reportConfirmModal.closeModal();
      toast(message);
      resetCommentState();
    },
    onError: () => {
      toast('댓글 신고에 실패했습니다.');
      resetCommentState();
    },
  });

  const handleCommentReportOptionModalOptionClick = (event) => {
    setSelectedReportType(event.currentTarget.dataset.value);
    reportConfirmModal.openModal();
  };

  const handleReportConfirmModalPrimaryButtonClick = () => {
    reportCommentMutate({
      reportType: selectedReportType,
    });
  };

  const onCommentOptionClick = (data) => {
    setCommentId(data.id);
    setContent(data.content);
    data.isWriter ? setIsOptionModalOpen(true) : setIsReportModalOpen(true);
  };

  const onCloseClick = () => {
    setCommentId(undefined);
    setContent('');
  };

  const handleReply = () => {
    resetCommentState();
    setCommentId(data.id);
    inputFocus();
  };

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
    children,
  } = data;

  return (
    <>
      <div
        ref={ref}
        className={styles.comment}
        onClick={(event) => event.stopPropagation()}
        style={{
          backgroundColor: commentId === data.id ? '#DDEBF6' : '#f8f8f8',
        }}
      >
        <div className={styles.commentTop}>
          <div className={styles.commentTopLeft}>
            <div className={styles.cloud}>
              <Icon id='cloud' width={19} height={13} />
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
            onClick={(e) => onCommentOptionClick(data)}
          >
            {!isDeleted && isVisible && (
              <Icon id='ellipsis-vertical' width={3} height={11} />
            )}
          </p>
        </div>
        <div
          className={`${styles.commentCenter} ${(isDeleted || !isVisible) && styles.hide}`}
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
        <div className={styles.commentBottom}>
          {!isDeleted && (
            <>
              <button
                className={styles.commentCount}
                type='button'
                onClick={handleReply}
              >
                <Icon id='comment' width={15} height={13} />
                <p>{children.length}</p>
              </button>
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
        id={
          pathname.startsWith('/board/permanent-snow') ||
          pathname.startsWith('/board/exam-review')
            ? 'comment-delete-no-points'
            : 'comment-delete'
        }
        isOpen={isDeleteModalOpen}
        closeFn={() => {
          resetCommentState();
          setContent('');
          setIsDeleteModalOpen(false);
        }}
        redBtnFunction={() => deleteComment.mutate({ commentId })}
      />
      <OptionModal
        id='comment-report'
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        closeFn={() => {
          onCloseClick();
          setIsReportModalOpen(false);
        }}
        onOptionClick={handleCommentReportOptionModalOptionClick}
      />
      <ConfirmModal
        title='해당 댓글을 신고할까요?'
        isOpen={reportConfirmModal.isOpen}
        primaryButtonText='확인'
        secondaryButtonText='취소'
        onPrimaryButtonClick={handleReportConfirmModalPrimaryButtonClick}
        onSecondaryButtonClick={reportConfirmModal.closeModal}
      />
    </>
  );
});

export default Comment;
