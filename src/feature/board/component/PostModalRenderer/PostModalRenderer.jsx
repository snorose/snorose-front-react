import { useLocation } from 'react-router-dom';

import {
  MoreOptionModal,
  ConfirmModal,
  IconOptionModal,
} from '@/shared/component';
import { getBoard } from '@/shared/lib';
import {
  MORE_OPTION_MODAL,
  CONFIRM_MODAL,
  OPTION_MODAL,
} from '@/shared/constant';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

export default function PostModalRenderer({
  modal,
  handleEdit,
  handleReport,
  handleDelete,
}) {
  const { pathname } = useLocation();
  const currentBoard = getBoard(pathname.split('/')[2]);
  const { setModal } = useContext(ModalContext);

  return (
    <>
      {(() => {
        switch (modal.id) {
          // 게시글 더보기 모달 (게시글 신고, 이용자 신고)
          case 'post-more-options':
            return (
              <MoreOptionModal
                modalContent={MORE_OPTION_MODAL.POST_MORE_OPTION}
                optionActions={{
                  'report-post': () =>
                    setModal({ id: 'report-post-types', type: null }),
                  'report-user': () =>
                    setModal({ id: 'report-user-types', type: null }),
                }}
              />
            );
          // 내 게시글 더보기 모달 (수정, 삭제)
          case 'my-post-more-options':
            return (
              <MoreOptionModal
                modalContent={MORE_OPTION_MODAL.MY_POST_MORE_OPTION}
                optionActions={{
                  'edit-post': () => handleEdit(),
                  'delete-post': () =>
                    setModal({ id: 'confirm-post-delete', type: null }),
                }}
              />
            );
          // 게시글 신고하기 옵션 리스트 모달
          case 'report-post-types':
            return (
              <IconOptionModal
                modalContent={OPTION_MODAL.REPORT_POST_TYPES}
                optionActions={{
                  'post-personal-abuse': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_PERSONAL_ABUSE',
                    }),
                  'post-commercial-ad': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_COMMERCIAL_AD',
                    }),
                  'post-illegal-distribution': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_ILLEGAL_DISTRIBUTION',
                    }),
                  'post-privacy-violation': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_PRIVACY_VIOLATION',
                    }),
                  'post-incitement-division': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_INCITEMENT_DIVISION',
                    }),
                  'post-adult-content': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_ADULT_CONTENT',
                    }),
                  'post-insincere-content': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_INSINCERE_CONTENT',
                    }),
                  'post-hateful-content': () =>
                    setModal({
                      id: 'confirm-post-report',
                      type: 'POST_HATEFUL_CONTENT',
                    }),
                }}
              />
            );
          // 유저 신고하기 옵션 리스트 모달
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
                    setModal({
                      id: 'confirm-user-report',
                      type: 'USER_FRAUD',
                    }),
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
                    setModal({
                      id: 'confirm-user-report',
                      type: 'USER_OTHER',
                    }),
                }}
              />
            );
          // 게시글 신고 최종 확인 모달
          case 'confirm-post-report':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.REPORT_POST}
                onConfirm={handleReport}
              />
            );
          // 유저 신고 최종 확인 모달
          case 'confirm-user-report':
            return (
              <ConfirmModal
                modalContent={CONFIRM_MODAL.REPORT_USER}
                onConfirm={handleReport}
              />
            );
          // 게시글 삭제 최종 확인 모달
          case 'confirm-post-delete':
            return (
              <ConfirmModal
                modalContent={
                  currentBoard.id !== 23
                    ? CONFIRM_MODAL.DELETE_POST
                    : CONFIRM_MODAL.DELETE_POST_WITHOUT_POINT_DEDUCTION
                }
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
