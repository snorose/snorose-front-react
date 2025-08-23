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

import { useToast } from '@/shared/hook';
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

// 알림 수신 설정 다음 상태값 계산
function calculateNextNotificationSettings({ current, type }) {
  switch (type.toUpperCase()) {
    case 'REQUIRED': {
      const next = !current.required;

      return {
        required: next,
        marketing: next ? current.marketing : false,
        attendance: next ? current.attendance : false,
      };
    }

    case 'MARKETING': {
      if (!current.required) return current;

      return {
        ...current,
        marketing: !current.marketing,
      };
    }

    case 'ATTENDANCE': {
      if (!current.required) return current;

      return {
        ...current,
        attendance: !current.attendance,
      };
    }

    default:
      return current;
  }
}
