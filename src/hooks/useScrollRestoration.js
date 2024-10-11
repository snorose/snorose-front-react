import { useLayoutEffect } from 'react';
import React from 'react';

export default function useScrollRestoration() {
  const scrollRef = React.useRef(null);

  // 스크롤 위치 저장
  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem('scrollY', scrollRef.current.scrollTop);
    }
  };

  // 스크롤 위치 삭제
  const clearScrollPosition = () => {
    sessionStorage.removeItem('scrollY');
  };

  // 스크롤 위치 복원
  useLayoutEffect(() => {
    if (scrollRef.current && sessionStorage.scrollY) {
      const savedScrollY = parseInt(sessionStorage.scrollY, 10);
      scrollRef.current.scrollTop = savedScrollY;
    }
  }, []);

  return { scrollRef, saveScrollPosition, clearScrollPosition };
}
