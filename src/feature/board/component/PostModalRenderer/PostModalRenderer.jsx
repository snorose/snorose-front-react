import {
  MoreOptionModal,
  NewConfirmModal,
  OptionModal,
} from '@/shared/component';
import { CONFIRM_MODAL_TEXT } from '@/shared/constant/confirmModal';
import {
  MY_POST_MORE_OPTION_LIST,
  POST_MORE_OPTION_LIST,
} from '../../constant/postMoreOptionList';
import { REPORT_POST_TYPE_LIST } from '@/feature/report/constant/reportPostTypeList';
import { REPORT_USER_TYPE_LIST } from '@/feature/report/constant/reportUserTypeList';

import { useLocation } from 'react-router-dom';
import { getBoard } from '@/shared/lib';

export default function PostModalRenderer({
  modal,
  handleEdit,
  handleReport,
  handleDelete,
}) {
  const { pathname } = useLocation();
  const currentBoard = getBoard(pathname.split('/')[2]);

  return (
    <>
      {(() => {
        switch (modal.id) {
          // 게시글 더보기 모달 (게시글 신고, 이용자 신고)
          case 'post-more-options':
            return (
              <MoreOptionModal
                title='게시글'
                optionList={POST_MORE_OPTION_LIST}
              />
            );
          // 내 게시글 더보기 모달 (수정, 삭제)
          case 'my-post-more-options':
            return (
              <MoreOptionModal
                title='내 게시글'
                optionList={MY_POST_MORE_OPTION_LIST}
                functions={[handleEdit, null]}
              />
            );
          // 게시글 신고하기 옵션 리스트 모달
          case 'report-post-types':
            return (
              <OptionModal
                title='게시글 신고'
                optionList={REPORT_POST_TYPE_LIST}
              />
            );
          // 유저 신고하기 옵션 리스트 모달
          case 'report-user-types':
            return (
              <OptionModal
                title='이용자 신고'
                optionList={REPORT_USER_TYPE_LIST}
              />
            );
          // 게시글 신고 최종 확인 모달
          case 'confirm-post-report':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_POST}
                onConfirm={handleReport}
              />
            );
          // 유저 신고 최종 확인 모달
          case 'confirm-user-report':
            return (
              <NewConfirmModal
                modalText={CONFIRM_MODAL_TEXT.REPORT_USER}
                onConfirm={handleReport}
              />
            );
          // 게시글 삭제 최종 확인 모달
          case 'confirm-post-delete':
            return (
              <NewConfirmModal
                modalText={
                  currentBoard.id !== 23
                    ? CONFIRM_MODAL_TEXT.DELETE_POST
                    : CONFIRM_MODAL_TEXT.DELETE_POST_WITHOUT_POINT_DEDUCTION
                }
                onClickHandler={handleDelete}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
}
