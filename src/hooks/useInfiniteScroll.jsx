import { useInfiniteQuery } from '@tanstack/react-query';

import { useIntersect } from '@/hooks';

export default function useInfiniteScroll({ queryKey, queryFn }) {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetching,
    status,
    isError,
    error,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.hasNext) {
        return null;
      }

      if (lastPage?.length === 0) {
        return null;
      }

      return lastPageParam + 1;
    },
  });

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { threshold: 0.8 }
  );

  return { data, isLoading, isFetching, status, isError, error, refetch, ref };
}
