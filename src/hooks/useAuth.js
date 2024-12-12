import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getMyPageUserInfo, withdrawAccount } from '@/apis';

import { useToast } from '@/hooks';

import { QUERY_KEY, TOAST } from '@/constants';

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const hasToken = !!localStorage.getItem('accessToken');

  const {
    data: userInfo,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.userInfo],
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
    queryClient.removeQueries([QUERY_KEY.userInfo]);
    navigate('/');
    window.location.reload();
    refetch();
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

  const invalidUserInfoQuery = () => {
    queryClient.invalidateQueries([QUERY_KEY.userInfo]);
  };

  return {
    userInfo,
    status,
    logout,
    withdraw,
    invalidUserInfoQuery,
  };
};

export default useAuth;
