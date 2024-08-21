import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getMyPageUserInfo, withdrawAccount } from '@/apis';
import { useQuery } from '@tanstack/react-query';

const useAuth = ({ isRequiredAuth = false } = {}) => {
  const navigate = useNavigate();

  const hasToken = !!localStorage.getItem('token');

  const {
    data: userInfoData,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['myPageUserInfo'],
    queryFn: getMyPageUserInfo,
    enabled: hasToken,
    staleTime: 1000 * 60 * 60 * 7,
    gcTime: 1000 * 60 * 60 * 7,
  });

  const status = useMemo(() => {
    if (isFetching) {
      return 'loading';
    }

    if (isSuccess) {
      return 'authenticated';
    }

    return 'unauthenticated';
  }, [isFetching, isSuccess]);

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

  useEffect(() => {
    if (isRequiredAuth && status === 'unauthenticated') {
      navigate('/login');
    }
  }, [isRequiredAuth, status, navigate]);

  return {
    userInfo: userInfoData?.result,
    status,
    logout,
    withdraw,
  };
};

export default useAuth;
