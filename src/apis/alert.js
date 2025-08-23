import { authAxios } from '@/axios';

export async function fetchNotificationList(category) {
  const response = await authAxios.get('/v1/alerts', {
    params: { filter: category },
  });

  return response.data;
}

export async function fetchNotificationSettings() {
  const response = await authAxios.get('/v1/user-agreements');

  return response.data.result;
}

export async function updateNotificationSettings(data) {
  const response = await authAxios.patch('/v1/user-agreements', data);

  return response.data.result;
}
