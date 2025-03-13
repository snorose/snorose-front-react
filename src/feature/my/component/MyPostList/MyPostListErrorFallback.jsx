import { ServerErrorFallback } from '@/shared/component';

export default function ActivityPostsErrorFallback({
  error,
  resetErrorBoundary,
}) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
