import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchByBoard } from '@/apis';

import { usePagination } from '@/hooks';

import { BOARD_ID, QUERY_KEY, STALE_TIME } from '@/constants';

export default function useSearch({
  urlKeyword,
  filterOption,
  enabled = true,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const boardType = pathname.split('/')[2];

  const [keyword, setKeyword] = useState(urlKeyword ?? '');
  const [newUrlKeyword, setNewUrlKeyword] = useState(keyword ?? '');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value.trim() === '') {
        setNewUrlKeyword(encodeURIComponent(keyword));
        boardType === 'exam-review'
          ? navigate(`/board/${boardType}`)
          : navigate(`/board/${boardType}/search`);
        return;
      }

      setNewUrlKeyword(encodeURIComponent(keyword));

      if (boardType === 'exam-review') {
        const param = Object.entries(filterOption).reduce(
          (result, [key, value]) =>
            value ? `${result}&${key}=${value}` : result,
          ''
        );

        navigate(
          `/board/${boardType}/search?query=${encodeURIComponent(keyword)}${param}`
        );
        return;
      }

      navigate(
        `/board/${boardType}/search?query=${encodeURIComponent(keyword)}`
      );
    }
  };

  const { data, ref, isLoading, isFetching, status, isError, error, refetch } =
    usePagination({
      queryKey: [QUERY_KEY.search, newUrlKeyword, boardType, filterOption],
      queryFn: ({ pageParam }) =>
        searchByBoard({
          boardId: BOARD_ID[boardType],
          boardType,
          page: pageParam,
          keyword,
          ...filterOption,
        }),
      staleTime: STALE_TIME.searchList,
      enabled,
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
    urlKeyword,
    refetch,
    handleChange,
    handleOnKeyDown,
  };
}
