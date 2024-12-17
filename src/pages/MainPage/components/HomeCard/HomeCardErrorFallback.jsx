import { ServerErrorFallback } from '@/components';

export default function HomeCardErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
