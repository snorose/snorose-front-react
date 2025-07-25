export const parseReportType = (reportType = '') => {
  if (reportType.startsWith('POST')) return 'post';
  if (reportType.startsWith('USER')) return 'user';
  if (reportType.startsWith('COMMENT')) return 'comment';
  return 'unknown';
};
