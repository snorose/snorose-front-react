import { ServerErrorFallback } from '@/shared/component';

export default function PointLogsErrorFallback({ error, resetErrorBoundary }) {
  const { status } = error;

  if (status === 404) {
    return <p>적립된 포인트 내역이 없습니다.</p>;
  }

  return <ServerErrorFallback reset={resetErrorBoundary} />;
}
