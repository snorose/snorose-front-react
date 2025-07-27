import {
  MoreOptionModal,
  NewConfirmModal,
  OptionModal,
} from '@/shared/component';
import { CONFIRM_MODAL_TEXT } from '@/shared/constant/confirmModal';

import { useLocation } from 'react-router-dom';
import { REPORT_COMMENT_TYPE_LIST } from '../../constant/reportCommentTypeList';
import { COMMENT_MORE_OPTION_LIST } from '../../constant/commentMoreOptionList';
import { useCommentContext } from '../../context';
import {
  useReportHandler,
} from '@/feature/report/hook/useReport';
import { useComment } from '../../hook';
import { useContext } from 'react';
import { ModalContext } from '@/shared/context/ModalContext';

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
                optionList={COMMENT_MORE_OPTION_LIST}
                top={moreOptionTop}
              />
            ) : null;
          // 댓글 신고하기 옵션 모달
          case 'report-comment-types':
            return (
              <OptionModal
                title='댓글 신고'
                optionList={REPORT_COMMENT_TYPE_LIST}
              />
            );
          // 댓글 신고 확인 모달
          case 'confirm-comment-report':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_COMMENT}
                onConfirm={handleReport}
              />
            );
          // 댓글 삭제 확인 모달
          case 'confirm-comment-delete':
            return (
              <NewConfirmModal
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
