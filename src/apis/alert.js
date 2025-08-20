import { authAxios } from '@/axios';

export async function fetchNotificationList(category) {
  const response = await authAxios.get('/v1/alerts', {
    params: { filter: category },
  });

  return response.data;
}
