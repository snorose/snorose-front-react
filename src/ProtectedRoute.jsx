import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

import { USER_STATUS } from './constants';

// 토큰이 유효한지 확인하는 로직 필요
export default function ProtectedRoute({ roles, children, to = '/', message }) {
  const { status, userInfo } = useAuth();

  if (status === USER_STATUS.loading) {
    return;
  }

  if (status === USER_STATUS.isLogout) {
    alert('로그인이 필요합니다.');
    return <Navigate to={'/login'} replace={true} />;
  }

  if (roles && !roles.includes(userInfo?.userRoleId)) {
    alert(message);
    return <Navigate to={to} replace={true} />;
  }

  return children;
}
