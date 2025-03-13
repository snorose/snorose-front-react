import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const examStart = new Date(2024, 11, 21, 0, 0, 0);
const examEnd = new Date(2024, 11, 21, 23, 59, 59);

export default function CheckExamPeriodRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();

    if (now >= examStart && now <= examEnd) {
      return;
    }

    alert('시험후기 작성 기간이 아닙니다.');
    navigate('/', { replace: true });
  }, []);

  return children;
}
