import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { FetchLoading } from '@/shared/component';

import {
  SearchResultList,
  SearchResultListErrorFallback,
} from '@/feature/search/component';

export default function SearchResultListSuspense() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={SearchResultListErrorFallback}
          resetKeys={[params]}
        >
          <Suspense fallback={<FetchLoading>검색 중</FetchLoading>}>
            <SearchResultList />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
