import { authAxios } from '@/axios/index.js';

export const updatePoint = async ({
  userId,
  category,
  source,
  sourceId,
  difference,
}) => {
  const response = await authAxios.post('/v1/points', {
    userId,
    category,
    source,
    ...(sourceId && { sourceId }),
    ...(difference && { difference }),
  });
  return response;
};

export const getPointList = async (params) => {
  const { data } = await authAxios.get('/v1/points/log', {
    params,
  });

  return data.result;
};
