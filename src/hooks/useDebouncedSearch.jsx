import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { searchByBoard } from '@/apis';

import { useInfiniteScroll } from '@/hooks';

import { debounce } from '@/utils';
import { BOARD_ID } from '@/constants';

export default function useDebouncedSearch({ urlKeyword, filterOption }) {
  const { pathname } = useLocation();
  const boardType = pathname.split('/')[2];

  const [keyword, setKeyword] = useState(urlKeyword ?? '');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const debouncedSearch = useCallback(
    (value) =>
      debounce(() => {
        setDebouncedKeyword(value);
      }, 500),
    []
  );

  const handleChange = (event) => {
    setKeyword(event.target.value);
    debouncedSearch(event.target.value);
  };

  const { data, ref, isLoading, isFetching, status, isError, error } =
    useInfiniteScroll({
      queryKey: [
        'search',
        boardType,
        debouncedKeyword || 'default',
        filterOption,
      ],
      queryFn: ({ pageParam }) =>
        searchByBoard({
          boardId: BOARD_ID[boardType],
          boardType,
          page: pageParam,
          keyword,
          ...filterOption,
        }),
      enabled: !!debouncedKeyword,
    });

  return {
    data,
    ref,
    isLoading,
    isFetching,
    status,
    isError,
    error,
    keyword,
    debouncedKeyword,
    handleChange,
  };
}
