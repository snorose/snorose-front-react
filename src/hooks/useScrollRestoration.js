import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants';

const PAGINATION_CACHE_SESSION = 'cachePagination';
const KEEP_SCROLL_SESSION = 'scrollY';

export default function useScrollRestoration() {
  const scrollRef = useRef(null);
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  // 스크롤 위치 저장
  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(KEEP_SCROLL_SESSION, scrollRef.current.scrollTop);
      sessionStorage.setItem(PAGINATION_CACHE_SESSION, 'keep pagination cache');
    }
  };

  // 스크롤 위치 복원
  useLayoutEffect(() => {
    if (scrollRef.current && sessionStorage.getItem(KEEP_SCROLL_SESSION)) {
      const savedScrollY = parseInt(
        sessionStorage.getItem(KEEP_SCROLL_SESSION),
        10
      );
      scrollRef.current.scrollTop = savedScrollY;
    }
  }, []);

  // 경로 변경 또는 새로고침 시 스크롤 위치 초기화
  useEffect(() => {
    const clearScrollPosition = () => {
      sessionStorage.removeItem(KEEP_SCROLL_SESSION);
    };

    const resetPaginationCache = () => {
      if (!sessionStorage.getItem(PAGINATION_CACHE_SESSION)) {
        queryClient.resetQueries([QUERY_KEY.noticeLine]);
      }

      sessionStorage.removeItem(PAGINATION_CACHE_SESSION);
    };

    resetPaginationCache();

    const shouldSaveScrollPosition =
      pathname.startsWith('/board/') && pathname.includes('/post');

    if (!shouldSaveScrollPosition) {
      clearScrollPosition();
    }

    const handleBeforeUnload = () => {
      clearScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return { scrollRef, saveScrollPosition };
}
