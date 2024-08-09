import { Navigate } from 'react-router-dom';
import { USER } from './dummy/data';

export default function ProtectedRoute({ roles, children }) {
  if (!USER || !USER.isLogin) {
    alert('로그인이 필요한 기능입니다.');
    return <Navigate to='/' replace={true} />;
  }

  if (roles && !roles.includes(USER?.role)) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
}
