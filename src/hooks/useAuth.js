import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getMyPageUserInfo, withdrawAccount } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { authState } from '@/stores';

const useAuth = () => {
  const [{ userInfo, status }, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();

  const hasToken = !!localStorage.getItem('token');

  const { data: userInfoData } = useQuery({
    queryKey: ['myPageUserInfo'],
    queryFn: getMyPageUserInfo,
    enabled: hasToken,
  });

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
    if (!hasToken) {
      setAuth({
        userInfo: null,
        status: 'unauthenticated',
      });
    }
  }, []);

  useEffect(() => {
    if (userInfoData !== undefined) {
      setAuth({
        userInfo: userInfoData.result,
        status: 'authenticated',
      });
    }
  }, [userInfoData]);

  return {
    userInfo,
    status,
    logout,
    withdraw,
  };
};

export default useAuth;
