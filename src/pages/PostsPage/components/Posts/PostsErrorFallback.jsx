import { ServerErrorFallback } from '@/shared/component';

export default function PostsErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
