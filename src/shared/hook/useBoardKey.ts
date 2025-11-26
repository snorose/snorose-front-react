import { useMatches, UIMatch } from 'react-router-dom';

import { BoardKey } from '@/shared/types';

function isBoardKeyMatch(
  match: UIMatch
): match is UIMatch & { handle: { boardKey: BoardKey } } {
  return (
    typeof match.handle === 'object' &&
    match.handle !== null &&
    'boardKey' in (match.handle as Record<string, unknown>)
  );
}

export default function useBoardKey(): BoardKey {
  const matches = useMatches();

  const match = matches.find(isBoardKeyMatch);
  if (!match) {
    throw new Error(
      'boardKey를 가진 라우트에서만 useBoardKey를 사용할 수 있습니다.'
    );
  }

  return match.handle.boardKey;
}
