import {
  MoreOptionModal,
  ConfirmModal,
  IconOptionModal,
} from '@/shared/component';
import {
  CONFIRM_MODAL_TEXT,
  OPTION_MODAL,
  MORE_OPTION_MODAL,
} from '@/shared/constant';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

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
                modalText={CONFIRM_MODAL_TEXT.EXAM_REVIEW_DUPLICATION}
                onConfirm={handleReport}
              />
            );
          // 시험후기 더보기 모달 (게시글 신고, 이용자 신고)
          case 'exam-review-more-options':
            return (
              <MoreOptionModal
                modalContent={MORE_OPTION_MODAL.EXAM_REVIEW_MORE_OPTION}
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
                modalContent={MORE_OPTION_MODAL.MY_EXAM_REVIEW_MORE_OPTION}
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
                modalContent={OPTION_MODAL.REPORT_EXAM_REVIEW_TYPES}
                optionActions={{
                  'post-personal-abuse': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_PERSONAL_ABUSE',
                    }),
                  'post-commercial-ad': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_COMMERCIAL_AD',
                    }),
                  'post-illegal-distribution': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_ILLEGAL_DISTRIBUTION',
                    }),
                  'post-privacy-violation': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_PRIVACY_VIOLATION',
                    }),
                  'post-incitement-division': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_INCITEMENT_DIVISION',
                    }),
                  'post-adult-content': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_ADULT_CONTENT',
                    }),
                  'post-insincere-content': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_INSINCERE_CONTENT',
                    }),
                  'post-hateful-content': () =>
                    setModal({
                      id: 'confirm-exam-review-report',
                      type: 'POST_HATEFUL_CONTENT',
                    }),
                }}
              />
            );
          // 이용자 신고하기 옵션 리스트 모달
          case 'report-user-types':
            return (
              <IconOptionModal
                modalContent={OPTION_MODAL.REPORT_USER_TYPES}
                optionActions={{
                  'user-impersonation': () =>
                    setModal({
                      id: 'confirm-user-report',
                      type: 'USER_IMPERSONATION',
                    }),
                  'user-fraud': () =>
                    setModal({ id: 'confirm-user-report', type: 'USER_FRAUD' }),
                  'user-external-party': () =>
                    setModal({
                      id: 'confirm-user-report',
                      type: 'USER_EXTERNAL_PARTY',
                    }),
                  'user-harassment': () =>
                    setModal({
                      id: 'confirm-user-report',
                      type: 'USER_HARASSMENT',
                    }),
                  'user-other': () =>
                    setModal({ id: 'confirm-user-report', type: 'USER_OTHER' }),
                }}
              />
            );
          // 시험후기 신고 최종 확인 모달
          case 'confirm-exam-review-report':
            return (
              <ConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_EXAM_REVIEW}
                onConfirm={handleReport}
              />
            );
          // 이용자 신고 최종 확인 모달
          case 'confirm-user-report':
            return (
              <ConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_USER}
                onConfirm={handleReport}
              />
            );
          // 시험후기 삭제 최종 확인 모달
          case 'confirm-exam-review-delete':
            return (
              <ConfirmModal
                modalText={CONFIRM_MODAL_TEXT.DELETE_EXAM_REVIEW}
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
