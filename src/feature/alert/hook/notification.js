import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchNotificationList } from '@/apis';

import { toNotificationItem } from '@/feature/alert/mapper';

export function useNotification(category) {
  const query = useSuspenseQuery({
    queryKey: ['notifications', { category }],
    queryFn: () =>
      fetchNotificationList(category === 'ALL' ? undefined : category),
    select: ({ result }) => result.map(toNotificationItem),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return query;
}
