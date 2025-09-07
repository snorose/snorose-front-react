import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import {
  USER_STATUS,
  CONFIRM_MODAL_TEXT,
  NOTICE_MODAL_TEXT,
} from '@/shared/constant';
import { ConfirmModal, NoticeModal } from '@/shared/component';

// 토큰이 유효한지 확인하는 로직 필요
export default function ProtectedRoute({ roles, message, children }) {
  const { status, userInfo } = useAuth();
  const navigate = useNavigate();

  if (status === USER_STATUS.loading) {
    return null;
  }

  if (status === USER_STATUS.isLogout) {
    alert('로그인이 필요합니다.');

    return <Navigate to='/login' replace />;
  }

  if (roles && !roles.includes(userInfo?.userRoleId)) {
    // "이미 인증을 완료했거나 인증 대상이 아니에요" 메시지인 경우 단일 버튼 모달 사용
    if (message === '이미 인증을 완료했거나 인증 대상이 아니에요') {
      return (
        <NoticeModal
          modalText={NOTICE_MODAL_TEXT.ALREADY_VERIFIED}
          onConfirm={() => navigate('/', { replace: true })}
        />
      );
    }

    const modalText = {
      ...CONFIRM_MODAL_TEXT.ACCESS_DENIED,
      title: message,
    };

    return (
      <ConfirmModal
        modalText={modalText}
        onConfirm={() => navigate('/', { replace: true })}
        onCancel={() => navigate(-1)}
      />
    );
  }

  return children;
}
