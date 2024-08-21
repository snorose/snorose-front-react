import { useNavigate } from 'react-router-dom';
import { withdrawAccount } from '@/apis';

const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const withdraw = async (currentPassword) => {
    try {
      await withdrawAccount({
        currentPassword,
      });
      alert('회원 탈퇴가 완료되었습니다.');
      logout();
    } catch {
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return {
    logout,
    withdraw,
  };
};

export default useAuth;
