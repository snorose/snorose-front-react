import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/shared/component';
import { SearchResults, SearchResultsErrorFallback } from '@/pages/SearchPage';

export default function SearchResultsSuspense({ saveScrollPosition }) {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={SearchResultsErrorFallback}
          resetKeys={[params]}
        >
          <Suspense fallback={<FetchLoading>검색 중</FetchLoading>}>
            <SearchResults saveScrollPosition={saveScrollPosition} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
