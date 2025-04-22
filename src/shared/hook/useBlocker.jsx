import { useEffect } from 'react';

export default function useBlocker(isDirty) {
  // 새로고침, 브라우저 닫기, 외부 URL 이동 시 native confirm 노출
  useEffect(() => {
    const handleBeforeunload = (e) => {
      console.log(isDirty);
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'aaaa';
      }
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => window.removeEventListener('beforeunload', handleBeforeunload);
  }, [isDirty]);
}
