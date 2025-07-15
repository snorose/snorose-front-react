export const getReportModalId = (title) => {
  if (title === '게시글 신고') return 'confirm-post-report';
  if (title === '이용자 신고') return 'confirm-user-report';
  if (title === '댓글 신고') return 'confirm-comment-report';
  return null;
};
