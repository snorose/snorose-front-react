import { Navigate } from 'react-router-dom';
import { USER } from './dummy/data';

// 토큰이 유효한지 확인하는 로직 필요
export default function ProtectedRoute({ roles, children, to, message }) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요합니다.');
    return <Navigate to={to} replace={true} />;
  }

  // role에 따른 접근 권한 제한
  if (roles && !roles.includes(USER?.role)) {
    alert(message);
    return <Navigate to={to} replace={true} />;
  }

  return children;
}
