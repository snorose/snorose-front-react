import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { ModalContext } from '@/shared/context/ModalContext';
import { useAuth } from '@/shared/hook';
import { USER_STATUS } from '@/shared/constant';

// 토큰이 유효한지 확인하는 로직 필요
export default function ProtectedRoute({ roles, message, children }) {
  const { status, userInfo } = useAuth();

  if (status === USER_STATUS.loading) {
    return null;
  }

  if (status === USER_STATUS.isLogout) {
    alert('로그인이 필요합니다.');

    return <Navigate to='/login' replace />;
  }

  if (roles && !roles.includes(userInfo?.userRoleId)) {
    return <AccessDeniedModal message={message} />;
  }

  return children;
}

function AccessDeniedModal({ message }) {
  const { open } = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    open('confirm', {
      title: message,
      description: `인증 페이지로 이동할까요?`,
      primaryText: '네',
      secondaryText: '아니요',
      onPrimary: () => navigate('/verify', { replace: true }),
      onSecondary: () => navigate(-1),
    });
  }, []);

  return null;
}
