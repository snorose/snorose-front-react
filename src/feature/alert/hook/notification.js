import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  fetchNotificationList,
  fetchNotificationSettings,
  updateNotificationSettings,
} from '@/apis';

import { MUTATION_KEY, QUERY_KEY } from '@/shared/constant';

import { toNotificationItem } from '@/feature/alert/mapper';

export function useNotification(category) {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.notifications(category),
    queryFn: () =>
      fetchNotificationList(category === 'ALL' ? undefined : category),
    select: ({ result }) => result.map(toNotificationItem),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useNotificationSettings() {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.notificationSettings,
    queryFn: async () => {
      const data = await fetchNotificationSettings();

      return {
        required: data.isRequiredConsent,
        marketing: data.isMarketingConsent,
        attendance: data.isAttendanceConsent,
      };
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MUTATION_KEY.updateNotificationSettings,

    mutationFn: async (newSettings) =>
      await updateNotificationSettings({
        isRequiredConsent: newSettings.required,
        isMarketingConsent: newSettings.marketing,
        isAttendanceConsent: newSettings.attendance,
      }),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.notificationSettings,
        refetchType: 'inactive',
      });
    },
  });
}
