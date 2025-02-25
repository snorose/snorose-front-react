import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/shared/component';
import { Posts, PostsErrorFallback } from '@/pages/PostsPage';

export default function PostsSuspense({ saveScrollPosition }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={PostsErrorFallback}>
          <Suspense
            fallback={<FetchLoading>게시글 불러오는 중...</FetchLoading>}
          >
            <Posts saveScrollPosition={saveScrollPosition} />;
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
