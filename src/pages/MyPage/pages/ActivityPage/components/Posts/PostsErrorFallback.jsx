import { ServerErrorFallback } from '@/components';

export default function ActivityPostsErrorFallback({
  error,
  resetErrorBoundary,
}) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
