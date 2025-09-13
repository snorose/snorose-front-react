import {
  MoreOptionModal,
  ConfirmModal,
  IconOptionModal,
} from '@/shared/component';
import { ModalContext } from '@/shared/context/ModalContext';
import {
  CONFIRM_MODAL,
  MORE_OPTION_MODAL,
  OPTION_MODAL,
} from '@/shared/constant';

import { useLocation } from 'react-router-dom';
import { useCommentContext } from '../../context';
import { useReportHandler } from '@/feature/report/hook/useReport';
import { useComment } from '../../hook';
import { useContext } from 'react';

export default function CommentModalRenderer({ data, moreOptionTop }) {
  const { pathname } = useLocation();
  const { modal, setModal } = useContext(ModalContext);
  const { handleReport } = useReportHandler(modal, setModal, data);
  const { deleteComment } = useComment();

  const { commentId, resetCommentState } = useCommentContext();

  return (
    <>
      {(() => {
        switch (modal.id) {
          // 남의 댓글 더보기 클릭 시 뜨는 모달
          case 'report-comment':
            return commentId === data.id ||
              data.children.some((child) => child.id === commentId) ? (
              <MoreOptionModal
                modalContent={MORE_OPTION_MODAL.COMMENT_MORE_OPTION}
                optionActions={{
                  'report-comment': () =>
                    setModal({ id: 'report-comment-types', type: null }),
                  'report-user': () =>
                    setModal({ id: 'report-user-types', type: null }),
                }}
                top={moreOptionTop}
              />
            ) : null;
          // 댓글 신고하기 옵션 모달
          case 'report-comment-types':
            return (
              <IconOptionModal
                modalContent={OPTION_MODAL.REPORT_COMMENT_TYPES}
                optionActions={{
                  'comment-personal-abuse': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_PERSONAL_ABUSE',
                    }),
                  'comment-commercial-ad': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_COMMERCIAL_AD',
                    }),
                  'comment-privacy-violation': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_PRIVACY_VIOLATION',
                    }),
                  'comment-incitement-division': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_INCITEMENT_DIVISION',
                    }),
                  'comment-adult-content': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_ADULT_CONTENT',
                    }),
                  'comment-spam': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_SPAM',
                    }),
                  'comment-other': () =>
                    setModal({
                      id: 'confirm-comment-report',
                      type: 'COMMENT_OTHER',
                    }),
                }}
              />
            );
          // 댓글 신고 확인 모달
          case 'confirm-comment-report':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.REPORT_COMMENT}
                onConfirm={handleReport}
              />
            );
          // 댓글 삭제 확인 모달
          case 'confirm-comment-delete':
            return (
              <ConfirmModal
                modalContent={
                  pathname.startsWith('/board/permanent-snow') ||
                  pathname.startsWith('/board/exam-review')
                    ? CONFIRM_MODAL.DELETE_COMMENT_WITHOUT_POINT_DEDUCTION
                    : CONFIRM_MODAL.DELETE_COMMENT
                }
                onConfirm={() => {
                  deleteComment.mutate({ commentId });
                  resetCommentState();
                  setModal({ id: null, type: null });
                }}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
}
