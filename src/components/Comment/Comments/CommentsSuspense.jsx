import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/shared/component';
import { Comments, CommentsErrorFallback } from '@/components';

export default function CommentsSuspense({ commentCount }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={CommentsErrorFallback}
        >
          <Suspense
            fallback={<FetchLoading>댓글을 불러오는 중...</FetchLoading>}
          >
            <Comments commentCount={commentCount} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
