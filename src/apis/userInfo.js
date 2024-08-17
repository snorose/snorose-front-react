import { authAxios } from '../axios';

export const withdrawAccount = async (body) => {
  const { data } = await authAxios.delete('/v1/users/withdraw', {
    data: body,
  });

  return data;
};

export const getMyPageUserInfo = async () => {
  const { data } = await authAxios.get('/v1/users/mypage');

  return data;
};
