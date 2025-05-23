import { useSearchParams } from 'react-router-dom';

import { useSuspensePagination } from '@/shared/hook';
import { QUERY_KEY, STALE_TIME } from '@/shared/constant';

import { searchByBoard } from '@/apis';

export default function useSearch({ boardId }) {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsLength = Object.keys(params).length;

  const { data, ref, isFetching, refetch } = useSuspensePagination({
    queryKey: [QUERY_KEY.search, boardId, JSON.stringify(params)],
    queryFn: ({ pageParam }) =>
      searchByBoard({
        boardId,
        page: pageParam,
        params,
      }),
    staleTime: STALE_TIME.searchList,
    enabled: paramsLength > 0,
  });

  return { data, ref, isFetching, refetch };
}
