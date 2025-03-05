import { FetchLoading, ServerErrorFallback } from '@/shared/component';

export default function SearchExamReviewsErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const { status } = error;

  if (status === 404) {
    return <FetchLoading animation={false}>검색 결과가 없습니다</FetchLoading>;
  }

  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
