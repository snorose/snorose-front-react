import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const now = new Date();
const examStart = new Date(2025, 1, 1); // 10월 20일
const examEnd = new Date(2025, 1, 1); // 10월 30일

export function CheckExamPeriodRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (now >= examStart && now <= examEnd) {
      return;
    }

    alert('시험후기 작성 기간이 아닙니다.');
    navigate('/', { replace: true });
  }, []);

  return children;
}
