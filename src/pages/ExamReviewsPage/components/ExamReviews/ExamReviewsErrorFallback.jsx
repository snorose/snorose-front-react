import { ServerErrorFallback } from '@/components';

export default function ExamReviewsErrorFallback({
  error,
  resetErrorBoundary,
}) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
