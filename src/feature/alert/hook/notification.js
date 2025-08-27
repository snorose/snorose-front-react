import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  fetchNotificationList,
  fetchNotificationSettings,
  readNotifications,
  updateNotificationSettings,
} from '@/apis';

import { useToast } from '@/shared/hook';
import { MUTATION_KEY, QUERY_KEY } from '@/shared/constant';

import { toNotificationItem } from '@/feature/alert/mapper';
import { calculateNextNotificationSettings } from '@/feature/alert/lib';
import { CATEGORY } from '@/feature/alert/constant';

export function useNotification(category) {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.notifications(category),

    queryFn: () =>
      fetchNotificationList(category === 'ALL' ? undefined : category),

    select: (data) => data.map(toNotificationItem),

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,
  });
}

export function useReadNotifications() {
  const queryClient = useQueryClient();

  const cancelAll = (queryKeys) =>
    Promise.all(
      queryKeys.map((qk) =>
        queryClient.cancelQueries({ queryKey: qk, exact: true })
      )
    );

  const backupAll = (queryKeys) =>
    queryKeys.map((qk) => [qk, queryClient.getQueryData(qk)]);

  const restoreAll = (entries) =>
    entries.forEach(([qk, prev]) => queryClient.setQueryData(qk, prev));

  const invalidateAll = (queryKeys) =>
    Promise.all(
      queryKeys.map((qk) =>
        queryClient.invalidateQueries({ queryKey: qk, exact: true })
      )
    );

  const onError = (error, variables, context) => {
    if (context?.previousEntries) restoreAll(context.previousEntries);
  };

  const onSettled = async (data, error, variables, context) => {
    if (context?.previousData) {
      invalidateAll(context.queryKeys);
    }
  };

  const markNotificationAsRead = useMutation({
    mutationKey: MUTATION_KEY.readNotifications,

    mutationFn: (notification) => readNotifications([notification.id]),

    onMutate: async (notification) => {
      const queryKeys = [
        QUERY_KEY.notifications('ALL'),
        QUERY_KEY.notifications(notification.category),
      ];

      await cancelAll(queryKeys);

      const previousEntries = backupAll(queryKeys);

      const optimisticOne = (id) => (old) =>
        old?.map((n) => (n.id === id ? { ...n, isRead: true } : n));

      queryKeys.forEach((qk) =>
        queryClient.setQueryData(qk, optimisticOne(notification.id))
      );

      return { previousEntries, queryKeys };
    },

    onError,

    onSettled,
  });

  const markAllNotificationsAsRead = useMutation({
    mutationKey: MUTATION_KEY.readAllNotifications,

    mutationFn: (category) => {
      const notifications = queryClient.getQueryData(
        QUERY_KEY.notifications(category)
      );
      const ids = notifications.map((notification) => notification.id);
      readNotifications(ids);
    },

    onMutate: async (category) => {
      const queryKeys =
        category === 'ALL'
          ? Object.keys(CATEGORY).map(QUERY_KEY.notifications)
          : ['ALL', category].map(QUERY_KEY.notifications);

      await cancelAll(queryKeys);

      const previousEntries = backupAll(queryKeys);

      const optimisticAll = (old) => old?.map((n) => ({ ...n, isRead: true }));

      queryKeys.forEach((queryKey) =>
        queryClient.setQueryData(queryKey, optimisticAll)
      );

      return { previousEntries, queryKeys };
    },

    onError,

    onSettled,
  });

  return { markNotificationAsRead, markAllNotificationsAsRead };
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
  const { toast } = useToast();

  return useMutation({
    mutationKey: MUTATION_KEY.updateNotificationSettings,

    mutationFn: async ({ type }) => {
      const next = queryClient.getQueryData(QUERY_KEY.notificationSettings); // onMutate 실행 이후 캐시값 조회

      return await updateNotificationSettings({
        isRequiredConsent: next.required,
        isMarketingConsent: next.marketing,
        isAttendanceConsent: next.attendance,
      });
    },

    // 낙관적 업데이트
    onMutate: async ({ type }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.notificationSettings,
      });

      const currentSettings = queryClient.getQueryData(
        QUERY_KEY.notificationSettings
      );

      const nextSettings = calculateNextNotificationSettings({
        current: currentSettings,
        type,
      });

      if (currentSettings === nextSettings) {
        return { hasChanges: false };
      }

      queryClient.setQueryData(QUERY_KEY.notificationSettings, nextSettings);

      return {
        previousSettings: currentSettings,
        nextSettings,
        hasChanges: true,
      };
    },

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(QUERY_KEY.notificationSettings, {
        required: data.isRequiredConsent,
        marketing: data.isMarketingConsent,
        attendance: data.isAttendanceConsent,
      });
    },

    onError: (error, variables, context) => {
      if (context?.hasChanges) {
        queryClient.setQueryData(
          QUERY_KEY.notificationSettings,
          context.previousSettings
        );
      }

      toast('설정 변경에 실패했어요. 다시 시도해주세요.');
    },
  });
}
