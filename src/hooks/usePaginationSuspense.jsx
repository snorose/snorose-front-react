import { useEffect, useCallback } from 'react';
import {
  useSuspenseInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export default function usePaginationSuspense({
  queryKey,
  queryFn,
  staleTime = 0,
  enabled,
}) {
  const queryClient = useQueryClient();

  const { data, isFetching, refetch, fetchNextPage } = useSuspenseInfiniteQuery(
    {
      queryKey,
      queryFn,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (!lastPage?.hasNext) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      staleTime,
      enabled,
    }
  );

  // refetch할 경우 페이지를 초기화하고 첫 페이지만 다시 요청
  const refetchWithReset = useCallback(async () => {
    queryClient.setQueryData(queryKey, (oldData) => ({
      pages: oldData?.pages.slice(0, 1) || [],
      pageParams: oldData?.pageParams.slice(0, 1) || [],
    }));
    await refetch();
  }, [queryClient, queryKey, refetch]);

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return {
    data,
    isFetching,
    refetch: refetchWithReset,
    ref,
  };
}
