import { ServerErrorFallback } from '@/shared/component';

export default function CommentsErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
