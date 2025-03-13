import { useRef, useLayoutEffect } from 'react';

const KEEP_SCROLL_SESSION = 'scrollTop';

export default function useScrollRestoration() {
  const scrollRef = useRef(0);

  // 스크롤 위치를 저장
  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(KEEP_SCROLL_SESSION, scrollRef.current.scrollTop);
    }
  };

  useLayoutEffect(() => {
    const scrollTop = sessionStorage.getItem(KEEP_SCROLL_SESSION) ?? 0;

    // 이전 스크롤 위치 복원
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTop; // 원하는 위치로 복원
    }
  }, []);

  return { scrollRef, saveScrollPosition }; // 필요 시 외부에서 호출 가능
}
