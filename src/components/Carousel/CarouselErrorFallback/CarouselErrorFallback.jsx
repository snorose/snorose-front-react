import { ServerErrorFallback } from '@/components';

export default function CarouselErrorFallback({ error, resetErrorBoundary }) {
  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
