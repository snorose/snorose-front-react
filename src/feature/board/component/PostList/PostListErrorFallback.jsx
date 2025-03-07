import { ServerErrorFallback } from '@/shared/component';

export default function PostListErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
