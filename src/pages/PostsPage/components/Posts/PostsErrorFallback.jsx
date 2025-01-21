import { ServerErrorFallback } from '@/components';

export default function PostsErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
