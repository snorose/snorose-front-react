import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchNotificationList, fetchNotificationSettings } from '@/apis';

import { toNotificationItem } from '@/feature/alert/mapper';

export function useNotification(category) {
  return useSuspenseQuery({
    queryKey: ['notifications', { category }],
    queryFn: () =>
      fetchNotificationList(category === 'ALL' ? undefined : category),
    select: ({ result }) => result.map(toNotificationItem),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useNotificationSettings() {
  return useSuspenseQuery({
    queryKey: ['notificationSettings'],
    queryFn: () => fetchNotificationSettings(),
    select: ({ result }) => {
      return {
        required: result.isRequiredConsent,
        marketing: result.isMarketingConsent,
        attendance: result.isAttendanceConsent,
      };
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
