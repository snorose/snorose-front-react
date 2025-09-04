import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { USER_STATUS, CONFIRM_MODAL_TEXT } from '@/shared/constant';
import { ConfirmModal } from '@/shared/component';

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
    return (
      <ConfirmModal
        modalText={CONFIRM_MODAL_TEXT.ACCESS_DENIED}
        onConfirm={() => navigate('/verify', { replace: true })}
        onCancel={() => navigate(-1)}
      />
    );
  }

  return children;
}
