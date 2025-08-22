export const CONFIRM_MODAL_TEXT = {
  EXIT_PAGE: {
    title: '페이지를 떠나시겠습니까?',
    description: '지금까지 작업한 내용이\n저장되지 않습니다',
    confirmText: '떠나기',
    cancelText: '머물기',
  },
  // 회원 탈퇴
  WITHDRAW_ACCOUNT: {
    title: '정말 탈퇴하시겠습니까?',
    description: null,
    confirmText: '확인',
    cancelText: '취소',
  },

  // 삭제 관련
  DELETE_POST: {
    title: '게시글을 삭제할까요?',
    description: '삭제 시 포인트가 차감돼요',
    confirmText: '삭제',
    cancelText: '취소',
  },
  DELETE_POST_WITHOUT_POINT_DEDUCTION: {
    // 베숙트 게시글 삭제는 포인트 차감 없음
    title: '게시글을 삭제할까요?',
    description: null,
    confirmText: '삭제',
    cancelText: '취소',
  },
  DELETE_EXAM_REVIEW: {
    title: '시험후기를 삭제할까요?',
    description: '삭제 시 포인트가 차감돼요',
    confirmText: '삭제',
    cancelText: '취소',
  },
  DELETE_COMMENT: {
    title: '댓글을 삭제할까요?',
    description: '삭제 시 포인트가 차감돼요',
    confirmText: '삭제',
    cancelText: '취소',
  },
  DELETE_COMMENT_WITHOUT_POINT_DEDUCTION: {
    // 시험후기 댓글 삭제는 포인트 차감 없음
    title: '댓글을 삭제할까요?',
    description: null,
    confirmText: '삭제',
    cancelText: '취소',
  },

  // 신고 관련
  REPORT_POST: {
    title: '게시글을 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },
  REPORT_EXAM_REVIEW: {
    title: '시험후기를 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },
  REPORT_USER: {
    title: '이용자를 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },
  REPORT_COMMENT: {
    title: '댓글을 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },

  // 중복 후기 관련
  EXAM_REVIEW_DUPLICATION: {
    title: `중복 후기가 있어요<br />계속 업로드할까요?`,
    description: `<span style="font-size: 14px; white-space: nowrap;">중복 후기의 경우, 먼저 올라온 후기보다<br /> 더 많은 문제가 기록된 경우만 허용돼요.<br />이외 모든 족보는 무통보 삭제되며 <br />포인트 회수 및 <span style="color: #FF4B6C;">경고 1회</span>가 부여돼요.</span>`,
    confirmText: '확인',
    cancelText: '취소',
  },
};
