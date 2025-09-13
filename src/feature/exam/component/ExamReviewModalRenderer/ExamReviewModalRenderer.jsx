import { useContext } from 'react';

import {
  MoreOptionModal,
  ConfirmModal,
  IconOptionModal,
} from '@/shared/component';
import {
  CONFIRM_MODAL,
  ICON_OPTION_MODAL,
  MORE_OPTION_MODAL,
} from '@/shared/constant';
import { ModalContext } from '@/shared/context/ModalContext';
import { createOptionActions } from '@/shared/component/Modal/lib/createOptionActions';

export default function ExamReviewModalRenderer({
  modal,
  handleEdit,
  handleReport,
  handleDelete,
}) {
  const { setModal } = useContext(ModalContext);

  return (
    <>
      {(() => {
        switch (modal.id) {
          case 'exam-review-download':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.EXAM_REVIEW_DUPLICATION}
                onConfirm={handleReport}
              />
            );
          // 시험후기 더보기 모달 (게시글 신고, 이용자 신고)
          case 'exam-review-more-options':
            return (
              <MoreOptionModal
                modalContent={MORE_OPTION_MODAL.EXAM_REVIEW_MORE_OPTIONS}
                optionActions={{
                  'report-exam-review': () =>
                    setModal({ id: 'report-exam-review-types', type: null }),
                  'report-user': () =>
                    setModal({ id: 'report-user-types', type: null }),
                }}
              />
            );
          // 내 시험후기 더보기 모달 (수정, 삭제)
          case 'my-exam-review-more-options':
            return (
              <MoreOptionModal
                modalContent={MORE_OPTION_MODAL.MY_EXAM_REVIEW_MORE_OPTIONS}
                optionActions={{
                  'edit-exam-review': () => handleEdit(),
                  'delete-exam-review': () =>
                    setModal({ id: 'confirm-exam-review-delete', type: null }),
                }}
              />
            );
          // 시험후기 신고하기 옵션 리스트 모달
          case 'report-exam-review-types':
            return (
              <IconOptionModal
                modalContent={ICON_OPTION_MODAL.REPORT_EXAM_REVIEW_TYPES}
                optionActions={{
                  ...createOptionActions(
                    setModal,
                    ICON_OPTION_MODAL.REPORT_EXAM_REVIEW_TYPES.options,
                    'confirm-exam-review-report'
                  ),
                }}
              />
            );
          // 이용자 신고하기 옵션 리스트 모달
          case 'report-user-types':
            return (
              <IconOptionModal
                modalContent={ICON_OPTION_MODAL.REPORT_USER_TYPES}
                optionActions={{
                  ...createOptionActions(
                    setModal,
                    ICON_OPTION_MODAL.REPORT_USER_TYPES.options,
                    'confirm-user-report'
                  ),
                }}
              />
            );
          // 시험후기 신고 최종 확인 모달
          case 'confirm-exam-review-report':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.REPORT_EXAM_REVIEW}
                onConfirm={handleReport}
              />
            );
          // 이용자 신고 최종 확인 모달
          case 'confirm-user-report':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.REPORT_USER}
                onConfirm={handleReport}
              />
            );
          // 시험후기 삭제 최종 확인 모달
          case 'confirm-exam-review-delete':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.DELETE_EXAM_REVIEW}
                onConfirm={handleDelete}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
}
