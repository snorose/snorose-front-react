import { authAxios } from '@/axios';

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
  const response = await authAxios.get('/v1/points/log', {
    params,
  });

  return response?.data.result;
};

export const getMonthlyAttendanceHistory = async ({ year, month }) => {
  const response = await authAxios.get('/v1/points/attendance', {
    params: { year, month },
  });
  return response?.data.result;
};
