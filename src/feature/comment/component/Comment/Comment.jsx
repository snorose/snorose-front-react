import { useMutation } from '@tanstack/react-query';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { reportComment } from '@/apis';

import {
  Badge,
  Icon,
  MoreOptionModal,
  NewConfirmModal,
  ReportOptionModal,
} from '@/shared/component';
import {
  LIKE_TYPE,
  MUTATION_KEY,
  ROLE,
  SHOW_BADGE_PATH,
} from '@/shared/constant';
import { useModal, useToast } from '@/shared/hook';
import { convertHyperlink, timeAgo } from '@/shared/lib';

import {
  NestedComment,
} from '@/feature/comment/component';
import { useCommentContext } from '@/feature/comment/context';
import { useComment } from '@/feature/comment/hook';
import { useLike } from '@/feature/like/hook';

import { ModalContext } from '@/shared/context/ModalContext';
import styles from './Comment.module.css';
import {
  COMMENT_MORE_OPTION_LIST,
  MY_COMMENT_MORE_OPTION_LIST,
} from '../../constant/commentMoreOptionList';
import { REPORT_COMMENT_TYPE_LIST } from '../../constant/reportCommentTypeList';
import { CONFIRM_MODAL_TEXT } from '@/shared/constant/confirmModal';
import { useReportHandler } from '@/feature/board/hook/useReportHandler';

const Comment = forwardRef((props, ref) => {
  const { modal, setModal } = useContext(ModalContext);
  const { pathname } = useLocation();
  const { data } = props;
  const {
    // setIsEdit,
    commentId,
    setCommentId,
    setContent,
    inputFocus,
    resetCommentState,
    isInputFocused,
    setIsInputFocused,
  } = useCommentContext();
  // const { deleteComment } = useComment();
  const { handleReport } = useReportHandler(modal, setModal, data);
  const { like, unlike } = useLike({
    type: LIKE_TYPE.comment,
    sourceId: data.id,
  });
  // const { toast } = useToast();

  // const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  // const [selectedReportType, setSelectedReportType] = useState();
  // const reportConfirmModal = useModal();

  // const { mutate: reportCommentMutate } = useMutation({
  //   mutationKey: [MUTATION_KEY.reportComment],
  //   mutationFn: (body) => reportComment(data.postId, data.id, body),
  //   onSuccess: ({ message }) => {
  //     setIsReportModalOpen(false);
  //     reportConfirmModal.closeModal();
  //     toast(message);
  //     resetCommentState();
  //   },
  //   onError: () => {
  //     toast('댓글 신고에 실패했습니다.');
  //     resetCommentState();
  //   },
  // });

  // const handleCommentReportOptionModalOptionClick = (event) => {
  //   setSelectedReportType(event.currentTarget.dataset.value);
  //   reportConfirmModal.openModal();
  // };

  // const handleReportConfirmModalPrimaryButtonClick = () => {
  //   reportCommentMutate({
  //     reportType: selectedReportType,
  //   });
  // };

  const onCommentOptionClick = (data) => {
    setCommentId(data.id);
    setContent(data.content);
    data.isWriter
      ? setModal({ id: 'my-comment-more-options', type: null })
      : setModal({ id: 'report-comment', type: null });
  };

  // const onCloseClick = () => {
  //   setCommentId(undefined);
  //   setContent('');
  // };

  const handleReply = () => {
    resetCommentState();
    setCommentId(data.id);
    inputFocus();
    setIsInputFocused({ isFocused: true, parent: String(data.id) });
  };

  const {
    userRoleId,
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

  // 뱃지가 보이는 ROLE
  const showBadge =
    userRoleId === ROLE.official ||
    (userRoleId === ROLE.admin &&
      SHOW_BADGE_PATH.some((path) => pathname.includes(path)));

  return (
    <>
      <div
        ref={ref}
        className={styles.comment}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.commentTop}>
          <div className={styles.commentTopLeft}>
            <div className={styles.cloud}>
              <Icon id='cloud' width={22} height={14} />
            </div>
            <p className={`${isWriterWithdrawn && styles.isWriterWithdrawn}`}>
              {isWriterWithdrawn ? '(알 수 없음)' : userDisplay}
            </p>
            {showBadge && (
              <Badge userRoleId={userRoleId} className={styles.badge} />
            )}
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(createdAt)} {isUpdated ? ' (수정됨)' : null}
            </p>
          </div>
          <div
            className={styles.dot3}
            onClick={(e) => onCommentOptionClick(data)}
          >
            {!isDeleted && isVisible && (
              <Icon id='meat-ball' width={18} height={4} stroke='none' />
            )}
          </div>
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
                <Icon
                  id='comment-stroke'
                  width={20}
                  height={17}
                  fill={
                    Number(isInputFocused.parent) === data.id
                      ? '#5F86BF'
                      : 'none'
                  }
                />
                <p>{children.length}</p>
              </button>
              <button
                className={styles.likedCount}
                type='button'
                onClick={() => (isLiked ? unlike.mutate() : like.mutate())}
              >
                <Icon
                  id='like-stroke'
                  width={16}
                  height={18}
                  fill={isLiked ? '#5F86BF' : 'none'}
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
        {modal.id === 'my-comment-more-options' && (
          <MoreOptionModal
            title='내 댓글'
            optionList={MY_COMMENT_MORE_OPTION_LIST}
          />
        )}
      </div>
      {(() => {
        switch (modal.id) {
          // case 'my-comment-options':
          //   return (
          //     <MyCommentMoreOptionsModal modal={modal} setModal={setModal} />
          //   );
          case 'report-comment':
            return (
              <MoreOptionModal
                title='댓글'
                optionList={COMMENT_MORE_OPTION_LIST}
              />
            );
          case 'report-comment-types':
            return (
              <ReportOptionModal
                title='댓글 신고'
                optionList={REPORT_COMMENT_TYPE_LIST}
              />
            );
          case 'confirm-comment-report':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_COMMENT}
                onClickHandler={handleReport}
              />
            );
          default:
            return null;
        }
      })()}

      {/* <OptionModal
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
      /> */}
    </>
  );
});

export default Comment;
