import {
  MoreOptionModal,
  NewConfirmModal,
  NewOptionModal,
} from '@/shared/component';
import { CONFIRM_MODAL_TEXT } from '@/shared/constant/confirmModal';
import {
  MY_EXAM_REVIEW_MORE_OPTION_LIST,
  EXAM_REVIEW_MORE_OPTION_LIST,
} from '../../constant/examReviewMoreOptionList';
import { REPORT_EXAM_REVIEW_TYPE_LIST } from '@/feature/report/constant/reportExamReviewTypeList';
import { REPORT_USER_TYPE_LIST } from '@/feature/report/constant/reportUserTypeList';

export default function ExamReviewModalRenderer({
  modal,
  handleEdit,
  handleReport,
  handleDelete,
}) {
  return (
    <>
      {(() => {
        switch (modal.id) {
          case 'exam-review-download':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.EXAM_REVIEW_DUPLICATION}
                onConfirm={handleReport}
              />
            );
          // 시험후기 더보기 모달 (게시글 신고, 이용자 신고)
          case 'exam-review-more-options':
            return (
              <MoreOptionModal
                title='시험후기'
                optionList={EXAM_REVIEW_MORE_OPTION_LIST}
              />
            );
          // 내 시험후기 더보기 모달 (수정, 삭제)
          case 'my-exam-review-more-options':
            return (
              <MoreOptionModal
                title='내 시험후기'
                optionList={MY_EXAM_REVIEW_MORE_OPTION_LIST}
                functions={[handleEdit, null]}
              />
            );
          // 시험후기 신고하기 옵션 리스트 모달
          case 'report-exam-review-types':
            return (
              <NewOptionModal
                title='시험후기 신고'
                optionList={REPORT_EXAM_REVIEW_TYPE_LIST}
              />
            );
          // 이용자 신고하기 옵션 리스트 모달
          case 'report-user-types':
            return (
              <NewOptionModal
                title='이용자 신고'
                optionList={REPORT_USER_TYPE_LIST}
              />
            );
          // 시험후기 신고 최종 확인 모달
          case 'confirm-exam-review-report':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_EXAM_REVIEW}
                onConfirm={handleReport}
              />
            );
          // 이용자 신고 최종 확인 모달
          case 'confirm-user-report':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_USER}
                onConfirm={handleReport}
              />
            );
          // 시험후기 삭제 최종 확인 모달
          case 'confirm-exam-review-delete':
            return (
              <NewConfirmModal
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
