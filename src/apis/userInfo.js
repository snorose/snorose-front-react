import { authAxios } from '../axios';

export const withdrawAccount = async (body) => {
  const { data } = await authAxios.delete('/v1/users/withdraw', {
    data: body,
  });

  return data;
};
