import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

export default function useScrollRestoration() {
  const scrollRef = React.useRef(null);
  const { pathname } = useLocation();

  // 스크롤 위치 저장
  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem('scrollY', scrollRef.current.scrollTop);
    }
  };

  // 스크롤 위치 복원
  useLayoutEffect(() => {
    if (scrollRef.current && sessionStorage.scrollY) {
      const savedScrollY = parseInt(sessionStorage.scrollY, 10);
      scrollRef.current.scrollTop = savedScrollY;
    }
  }, []);

  // 경로 변경 또는 새로고침 시 스크롤 위치 초기화
  useEffect(() => {
    const clearScrollPosition = () => {
      sessionStorage.removeItem('scrollY');
    };

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
