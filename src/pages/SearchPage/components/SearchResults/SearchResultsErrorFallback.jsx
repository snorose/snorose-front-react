import { FetchLoading, ServerErrorFallback } from '@/components';

export default function SearchResultsErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const { status } = error;

  if (status === 404) {
    return <FetchLoading animation={false}>검색 결과가 없습니다</FetchLoading>;
  }

  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
