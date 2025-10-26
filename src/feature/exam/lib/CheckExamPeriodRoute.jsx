import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hook';
import { ROLE } from '@/shared/constant/role';

// 시험 후기 작성 기간: 2025년 10월 27일 ~ 2025년 11월 2일
const examStart = new Date(2025, 9, 27, 0, 0, 0);
const examEnd = new Date(2025, 10, 2, 23, 59, 59);

export default function CheckExamPeriodRoute({ children }) {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.userRoleId === ROLE.admin) {
      return;
    }

    const now = new Date();

    if (now >= examStart && now <= examEnd) {
      return;
    }

    alert('시험후기 작성 기간이 아닙니다.');
    navigate('/', { replace: true });
  }, [userInfo]);

  return children;
}
