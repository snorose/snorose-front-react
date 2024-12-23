import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/components';
import {
  SearchExamReviews,
  SearchExamReviewsErrorFallback,
} from '@/pages/ExamReviewsPage';

export default function SearchExamReviewsSuspense({ saveScrollPosition }) {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={SearchExamReviewsErrorFallback}
          resetKeys={[params]}
        >
          <Suspense fallback={<FetchLoading>검색 중</FetchLoading>}>
            <SearchExamReviews saveScrollPosition={saveScrollPosition} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
