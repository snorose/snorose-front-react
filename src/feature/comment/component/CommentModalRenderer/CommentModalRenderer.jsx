import {
  MoreOptionModal,
  ConfirmModal,
  IconOptionModal,
} from '@/shared/component';
import { ModalContext } from '@/shared/context/ModalContext';
import {
  CONFIRM_MODAL_TEXT,
  MORE_OPTION_MODAL_TEXT,
  OPTION_MODAL_TEXT,
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
                title='댓글'
                optionList={MORE_OPTION_MODAL_TEXT.COMMENT_MORE_OPTION_LIST}
                top={moreOptionTop}
              />
            ) : null;
          // 댓글 신고하기 옵션 모달
          case 'report-comment-types':
            return (
              <IconOptionModal
                title='댓글 신고'
                optionList={OPTION_MODAL_TEXT.REPORT_COMMENT_TYPE_LIST}
              />
            );
          // 댓글 신고 확인 모달
          case 'confirm-comment-report':
            return (
              <ConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_COMMENT}
                onConfirm={handleReport}
              />
            );
          // 댓글 삭제 확인 모달
          case 'confirm-comment-delete':
            return (
              <ConfirmModal
                modalText={
                  pathname.startsWith('/board/permanent-snow') ||
                  pathname.startsWith('/board/exam-review')
                    ? CONFIRM_MODAL_TEXT.DELETE_COMMENT_WITHOUT_POINT_DEDUCTION
                    : CONFIRM_MODAL_TEXT.DELETE_COMMENT
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
