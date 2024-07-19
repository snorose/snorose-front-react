import { Navigate } from 'react-router-dom';
import { user } from './dummy/user.js';

export default function ProtectedRoute({ roles, children }) {
  if (!user || !user.isLogin) {
    return <Navigate to='/' replace={true} />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
}
