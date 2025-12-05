import { useParams } from 'react-router-dom';

import { NotFoundPage } from '@/page/etc';

const VALID_REPORT_TYPES = ['post', 'comment', 'user', 'exam'];

export default function WriteReportPage() {
  const { reportType } = useParams();

  if (!VALID_REPORT_TYPES.includes(reportType)) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <div>WriteReportPage</div>
      <div>Report Type: {reportType}</div>
    </div>
  );
}
