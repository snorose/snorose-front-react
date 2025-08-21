import { authAxios } from '@/axios';

export async function fetchNotificationSettings() {
  const response = await authAxios.get('/v1/user-agreements');

  return response.data;
}

export async function fetchNotificationList(category) {
  const response = await authAxios.get('/v1/alerts', {
    params: { filter: category },
  });

  return response.data;
}
