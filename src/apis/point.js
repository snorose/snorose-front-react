import { authAxios } from '@/axios';

export const getPointLogs = async (params) => {
  const response = await authAxios.get('/v1/points/log', {
    params,
  });
  return response?.data.result;
};
