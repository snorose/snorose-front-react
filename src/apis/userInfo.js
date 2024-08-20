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

export const updateUserInfo = async (body) => {
  const { data } = await authAxios.patch('/v1/users/mypage', body);

  return data;
};

export const updatePassword = async (body) => {
  const { data } = await authAxios.patch('/v1/users/mypage/password', body);

  return data;
};
