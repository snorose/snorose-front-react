import { ServerErrorFallback } from '@/components';

export default function CarouselErrorFallback({ error, resetErrorBoundary }) {
  const { status } = error;

  if (status === 500) {
    return <ServerErrorFallback reset={resetErrorBoundary} />;
  }
}
