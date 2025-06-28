import { useContext, useEffect } from 'react';
import { useBlocker as useRouteBlocker } from 'react-router-dom';

import { ModalContext } from '@/shared/context/ModalContext';

export default function useBlockerNew(isBlock, actions = ['POP']) {
  const { setModal } = useContext(ModalContext);

  // 뒤로가기 시 커스텀 모달 노출
  const blocker = useRouteBlocker(({ historyAction }) => {
    if (!isBlock) return false;

    const actionType = actions.map((action) => action.toUpperCase());

    return actionType.includes(historyAction);
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setModal({
        id: 'EXIT_PAGE',
        type: null,
      });
    } else if (blocker.state === 'proceeding') {
      blocker.reset();
    }
  }, [blocker.state, setModal, blocker]);

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
