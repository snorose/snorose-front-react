import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchByBoard } from '@/apis';

import { useInfiniteScroll } from '@/hooks';

import { BOARD_ID } from '@/constants';

export default function useSearch({ urlKeyword, filterOption }) {
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
      } else {
        setNewUrlKeyword(encodeURIComponent(keyword));
        navigate(`/board/${boardType}/search/${encodeURIComponent(keyword)}`);
      }
    }
  };

  const { data, ref, isLoading, isFetching, status, isError, error } =
    useInfiniteScroll({
      queryKey: ['search', newUrlKeyword, boardType, filterOption],
      queryFn: ({ pageParam }) =>
        searchByBoard({
          boardId: BOARD_ID[boardType],
          boardType,
          page: pageParam,
          keyword,
          ...filterOption,
        }),
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
    handleChange,
    handleOnKeyDown,
  };
}
