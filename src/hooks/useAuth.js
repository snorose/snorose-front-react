import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMyPageUserInfo, withdrawAccount } from '@/apis';

import { useToast } from '@/hooks';

import { TOAST } from '@/constants';

const useAuth = ({ isRequiredAuth = false } = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const hasToken = !!localStorage.getItem('accessToken');

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
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const withdraw = async (currentPassword, { onSuccess, onError } = {}) => {
    try {
      await withdrawAccount({
        currentPassword,
      });
      toast(TOAST.USER.withdraw);
      logout();

      if (onSuccess !== undefined) {
        onSuccess();
      }
    } catch ({ response }) {
      toast(response.data.message);

      if (onError !== undefined) {
        onError();
      }
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
