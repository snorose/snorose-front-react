import { ServerErrorFallback } from '@/shared/component';

export default function HomeCardErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
