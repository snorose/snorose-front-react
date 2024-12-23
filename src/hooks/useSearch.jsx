import { useSearchParams } from 'react-router-dom';

import { searchByBoard } from '@/apis';
import { usePagination } from '@/hooks';
import { QUERY_KEY, STALE_TIME } from '@/constants';

export default function useSearch({ boardId }) {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsLength = Object.keys(params).length;

  const { data, ref, isLoading, isFetching, status, isError, error, refetch } =
    usePagination({
      queryKey: [QUERY_KEY.search, boardId, params],
      queryFn: ({ pageParam }) =>
        searchByBoard({
          boardId,
          page: pageParam,
          params,
        }),
      staleTime: STALE_TIME.searchList,
      enabled: paramsLength > 0,
    });

  return {
    data,
    ref,
    isLoading,
    isFetching,
    status,
    isError,
    error,
    refetch,
  };
}
