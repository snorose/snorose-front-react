import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/shared/component';

import { PostList, PostListErrorFallback } from '@/feature/board/component';

export default function PostListSuspense({ saveScrollPosition }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={PostListErrorFallback}
        >
          <Suspense
            fallback={<FetchLoading>게시글 불러오는 중...</FetchLoading>}
          >
            <PostList saveScrollPosition={saveScrollPosition} />;
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
