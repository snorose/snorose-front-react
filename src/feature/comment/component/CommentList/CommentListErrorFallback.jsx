import { ServerErrorFallback } from '@/shared/component';

export default function CommentListErrorFallback({
  error,
  resetErrorBoundary,
}) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
