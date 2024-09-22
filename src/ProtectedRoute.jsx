import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

import { USER_STATUS } from './constants';

// 토큰이 유효한지 확인하는 로직 필요
export default function ProtectedRoute({ roles, message, children }) {
  const navigate = useNavigate();
  const { status, userInfo } = useAuth();

  useEffect(() => {
    if (status === USER_STATUS.loading) {
      return;
    }

    if (status === USER_STATUS.isLogout) {
      alert('로그인이 필요합니다.');
      navigate('/login', { replace: true });
      return;
    }

    if (roles && !roles.includes(userInfo?.userRoleId)) {
      alert(message);
      navigate(-1);
      return;
    }
  }, [status, roles, userInfo, navigate, message]);

  return children;
}
