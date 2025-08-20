import { authAxios } from '@/axios';

export const getUnreadAlertCount = async () => {
  const response = await authAxios.get('/v1/alerts/unread/count');
  const data = response?.data ?? {};

  if (data?.isSuccess !== true) {
    throw new Error(data?.message || '미확인 알림 개수 조회 API 연결 실패');
  }

  const count = Number(data?.result ?? 0);
  return Number.isFinite(count) ? count : 0;
};

export async function fetchNotificationList(category) {
  const response = await authAxios.get('/v1/alerts', {
    params: { filter: category },
  });

  return response.data;
}
