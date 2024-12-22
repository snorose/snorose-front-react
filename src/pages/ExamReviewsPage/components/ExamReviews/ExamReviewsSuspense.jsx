import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/components';
import { ExamReviews, ExamReviewsErrorFallback } from '@/pages/ExamReviewsPage';

export default function ExamReviewsSuspense({ saveScrollPosition }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={ExamReviewsErrorFallback}
        >
          <Suspense fallback={<FetchLoading>불러오는 중</FetchLoading>}>
            <ExamReviews saveScrollPosition={saveScrollPosition} />;
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
