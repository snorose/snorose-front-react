import { ServerErrorFallback } from '@/components';

export default function CommentsErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
