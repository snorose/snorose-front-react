import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

import {
  MoreOptionModal,
  ConfirmModal,
  IconOptionModal,
} from '@/shared/component';
import { ModalContext } from '@/shared/context/ModalContext';
import { createOptionActions } from '@/shared/component/Modal/lib/createOptionActions';
import {
  CONFIRM_MODAL,
  MORE_OPTION_MODAL,
  ICON_OPTION_MODAL,
} from '@/shared/constant';

import { useCommentContext } from '../../context';
import { useReportHandler } from '@/feature/report/hook/useReport';
import { useComment } from '../../hook';

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
                modalContent={MORE_OPTION_MODAL.COMMENT_MORE_OPTIONS}
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
                modalContent={ICON_OPTION_MODAL.REPORT_COMMENT_TYPES}
                optionActions={{
                  ...createOptionActions(
                    setModal,
                    ICON_OPTION_MODAL.REPORT_COMMENT_TYPES.options,
                    'confirm-comment-report'
                  ),
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
