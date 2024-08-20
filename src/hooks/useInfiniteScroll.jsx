import { useInfiniteQuery } from '@tanstack/react-query';

import { useIntersect } from '@/hooks';

import { Target } from '@/components/Target';

export default function useInfiniteScroll({ queryKey, queryFn }) {
  const { data, hasNextPage, isFetching, status, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0) {
          return undefined;
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

  return { data, isFetching, status, ref, Target };
}
