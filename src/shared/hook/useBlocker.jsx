import { useContext, useEffect } from 'react';
import { useBlocker as useRouteBlocker } from 'react-router-dom';

import { ModalContext } from '@/shared/context/ModalContext';

export default function useBlocker(isBlock) {
  const { open } = useContext(ModalContext);

  // 뒤로가기 시 커스텀 모달 노출
  const blocker = useRouteBlocker(
    ({ historyAction }) => isBlock && historyAction === 'POP'
  );

  useEffect(() => {
    if (blocker.state === 'blocked') {
      open('confirm', {
        title: '작성 중인 글이 있습니다',
        description: `정말 이동하시겠습니까?`,
        primaryText: '떠나기',
        secondaryText: '머물기',
        onPrimary: blocker.proceed,
        onSecondary: blocker.reset,
      });
    }
  }, [blocker.state]);

  // 새로고침, 브라우저 닫기, 외부 URL 이동 시 native confirm 노출
  useEffect(() => {
    const handleBeforeunload = (e) => {
      if (isBlock) {
        e.preventDefault();
        e.returnValue = 'aaaa';
      }
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => window.removeEventListener('beforeunload', handleBeforeunload);
  }, [isBlock]);
}
