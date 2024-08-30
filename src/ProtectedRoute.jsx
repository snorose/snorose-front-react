import { Navigate } from 'react-router-dom';
import { USER } from './dummy/data';

// 토큰이 유효한지 확인하는 로직 필요

export default function ProtectedRoute({ roles, children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요한 기능입니다.');
    return <Navigate to='/' replace={true} />;
  }

  // if (!USER || !USER.isLogin) {
  //   alert('로그인이 필요한 기능입니다.');
  //   return <Navigate to='/' replace={true} />;
  // }

  if (roles && !roles.includes(USER?.role)) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
}
