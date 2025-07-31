import { ServerErrorFallback } from '@/shared/component';

export default function PointLogListErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const { status } = error;

  if (status === 404) {
    return <p>적립된 포인트 내역이 없어요</p>;
  }

  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
