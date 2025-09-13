// =================== More Option Modal (옵션 n개로 확장 가능)===================
const POST_MORE_OPTION = {
  modalId: 'post-more-options',
  title: '게시글',
  options: [
    {
      id: 'report-post',
      iconId: 'report-post',
      text: '게시글 신고',
      width: 19,
      height: 22,
    },
    {
      id: 'report-user',
      iconId: 'report-user',
      text: '이용자 신고하기',
      width: 17,
      height: 17,
    },
  ],
};

const MY_POST_MORE_OPTION = {
  modalId: 'my-post-more-options',
  title: '내 게시글',
  options: [
    {
      id: 'edit-post',
      iconId: 'pencil-grey',
      text: '수정하기',
      width: 19,
      height: 22,
    },
    {
      id: 'delete-post',
      iconId: 'trash',
      text: '삭제하기',
      width: 16,
      height: 20,
    },
  ],
};

const EXAM_REVIEW_MORE_OPTION = {
  modalId: 'exam-review-more-options',
  title: '시험후기',
  options: [
    {
      id: 'report-exam-review',
      iconId: 'report-post',
      text: '시험후기 신고',
      width: 19,
      height: 22,
    },
    {
      id: 'report-user',
      iconId: 'report-user',
      text: '이용자 신고하기',
      width: 17,
      height: 17,
    },
  ],
};

const MY_EXAM_REVIEW_MORE_OPTION = {
  modalId: 'my-exam-review-more-options',
  title: '내 시험후기',
  options: [
    {
      id: 'edit-exam-review',
      iconId: 'pencil-grey',
      text: '수정하기',
      width: 19,
      height: 22,
    },
    {
      id: 'delete-exam-review',
      iconId: 'trash',
      text: '삭제하기',
      width: 16,
      height: 20,
    },
  ],
};

const COMMENT_MORE_OPTION = {
  modalId: 'comment-more-options',
  title: '댓글',
  options: [
    {
      id: 'report-comment',
      iconId: 'report-comment',
      text: '댓글 신고',
      width: 21,
      height: 22,
    },
    {
      id: 'report-user',
      iconId: 'report-user',
      text: '이용자 신고하기',
      width: 17,
      height: 17,
    },
  ],
};
const MY_COMMENT_MORE_OPTION = {
  modalId: 'my-comment-more-options',
  title: '내 댓글',
  options: [
    {
      id: 'edit-comment',
      iconId: 'pencil-grey',
      text: '수정하기',
      width: 19,
      height: 22,
    },
    {
      id: 'delete-comment',
      iconId: 'trash',
      text: '삭제하기',
      width: 16,
      height: 20,
    },
  ],
};

// =================== Confirm Modal (옵션 2개로 고정 - confirm, cancel)===================
const CONFIRM_MODAL = {
  // 게시글 관련 확인 모달
  DELETE_POST: {
    title: '게시글을 삭제할까요?',
    description: '삭제 시 포인트가 차감돼요',
    confirmText: '삭제',
    cancelText: '취소',
  },
  DELETE_POST_WITHOUT_POINT_DEDUCTION: {
    title: '게시글을 삭제할까요?', // 베숙트 게시글 삭제는 포인트 차감 없음
    description: null,
    confirmText: '삭제',
    cancelText: '취소',
  },
  REPORT_POST: {
    title: '게시글을 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },
  // 시험후기 관련 확인 모달
  DELETE_EXAM_REVIEW: {
    title: '시험후기를 삭제할까요?',
    description: '삭제 시 포인트가 차감돼요',
    confirmText: '삭제',
    cancelText: '취소',
  },
  REPORT_EXAM_REVIEW: {
    title: '시험후기를 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },
  EXAM_REVIEW_DUPLICATION: {
    title: `중복 후기가 있어요<br />계속 업로드할까요?`,
    description: `<span style="font-size: 14px; white-space: nowrap;">중복 후기의 경우, 먼저 올라온 후기보다<br /> 더 많은 문제가 기록된 경우만 허용돼요.<br />이외 모든 족보는 무통보 삭제되며 <br />포인트 회수 및 <span style="color: #FF4B6C;">경고 1회</span>가 부여돼요.</span>`,
    confirmText: '확인',
    cancelText: '취소',
  },
  EXAM_REVIEW_DOWNLOAD: {
    title: '다운로드할까요?',
    description: '다운로드시 50 포인트가 차감돼요',
    confirmText: '확인',
    cancelText: '취소',
  },

  // 댓글 관련 확인 모달
  DELETE_COMMENT: {
    title: '댓글을 삭제할까요?',
    description: '삭제 시 포인트가 차감돼요',
    confirmText: '삭제',
    cancelText: '취소',
  },
  DELETE_COMMENT_WITHOUT_POINT_DEDUCTION: {
    title: '댓글을 삭제할까요?', // 시험후기 댓글 삭제는 포인트 차감 없음
    description: null,
    confirmText: '삭제',
    cancelText: '취소',
  },

  REPORT_COMMENT: {
    title: '댓글을 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },

  // 유저 관련 확인 모달
  REPORT_USER: {
    title: '이용자를 신고할까요?',
    description: null,
    confirmText: '신고',
    cancelText: '취소',
  },
  WITHDRAW_ACCOUNT: {
    title: '정말 탈퇴하시겠습니까?',
    description: null,
    confirmText: '확인',
    cancelText: '취소',
  },

  // etc 확인 모달
  EXIT_PAGE: {
    title: '페이지를 떠나시겠습니까?',
    description: '지금까지 작업한 내용이\n저장되지 않습니다',
    confirmText: '떠나기',
    cancelText: '머물기',
  },
  ACCESS_DENIED: {
    title: null,
    description: '인증 페이지로 이동할까요?',
    confirmText: '네',
    cancelText: '아니요',
  },
};

// =================== Text Option Modal (옵션 n개로 확장 가능)===================
// 인증 관련 모달
const ALREADY_VERIFIED = {
  title: '인증이 필요하지 않아요',
  description: '이미 인증을 완료했거나\n인증 대상이 아니에요.',
  options: [{ id: 'home', text: '홈으로 이동' }],
};

// =================== Icon Option Modal (옵션 n개로 확장 가능)===================
// 게시글 신고 모달
const REPORT_POST_TYPES = {
  modalId: 'report-post-types',
  title: '게시글 신고',
  options: [
    {
      id: 'post-personal-abuse',
      iconId: 'comment-exclamation-question-mark',
      text: '특정인에 대한 욕설 및 비하',
      width: 20,
      height: 20,
    },
    {
      id: 'post-commercial-ad',
      iconId: 'dollar-circle',
      text: '상업적 광고 및 판매',
      width: 20,
      height: 20,
    },
    {
      id: 'post-illegal-distribution',
      iconId: 'camera-blue-stroke',
      text: '불법촬영물 등의 유통',
      width: 20,
      height: 19,
    },
    {
      id: 'post-privacy-violation',
      iconId: 'x-shield',
      text: '개인정보 유출',
      width: 18,
      height: 20,
    },
    {
      id: 'post-incitement-division',
      iconId: 'traffic-cone',
      text: '선동 및 분란 유발',
      width: 20,
      height: 20,
    },
    {
      id: 'post-adult-content',
      iconId: 'hand-stop',
      text: '음란물 / 불건전한 만남 및 대화',
      width: 20,
      height: 22,
    },
    {
      id: 'post-insincere-content',
      iconId: 'list-x-circle',
      text: '무성의한 게시글',
      width: 20,
      height: 16,
    },
    {
      id: 'post-hateful-content',
      iconId: 'sad-face',
      text: '타인에게 혐오감 선사',
      width: 20,
      height: 20,
    },
  ],
};

// 시험후기 신고 모달
const REPORT_EXAM_REVIEW_TYPES = {
  modalId: 'report-exam-review-types',
  title: '시험후기 신고',
  options: [
    {
      id: 'post-personal-abuse',
      iconId: 'comment-exclamation-question-mark',
      text: '특정인에 대한 욕설 및 비하',
      width: 20,
      height: 20,
    },
    {
      id: 'post-commercial-ad',
      iconId: 'dollar-circle',
      text: '상업적 광고 및 판매',
      width: 20,
      height: 20,
    },
    {
      id: 'post-illegal-distribution',
      iconId: 'camera-blue-stroke',
      text: '불법촬영물 등의 유통',
      width: 20,
      height: 19,
    },
    {
      id: 'post-privacy-violation',
      iconId: 'x-shield',
      text: '개인정보 유출',
      width: 18,
      height: 20,
    },
    {
      id: 'post-incitement-division',
      iconId: 'traffic-cone',
      text: '선동 및 분란 유발',
      width: 20,
      height: 20,
    },
    {
      id: 'post-adult-content',
      iconId: 'hand-stop',
      text: '음란물 / 불건전한 만남 및 대화',
      width: 20,
      height: 22,
    },
    {
      id: 'post-insincere-content',
      iconId: 'list-x-circle',
      text: '무성의한 게시글',
      width: 20,
      height: 16,
    },
    {
      id: 'post-hateful-content',
      iconId: 'sad-face',
      text: '타인에게 혐오감 선사',
      width: 20,
      height: 20,
    },
  ],
};

// 유저 신고 모달
const REPORT_USER_TYPES = {
  modalId: 'report-user-types',
  title: '유저 신고',
  options: [
    {
      id: 'user-impersonation',
      iconId: 'user-question-mark',
      text: '타인 사칭',
      width: 20,
      height: 18,
    },
    {
      id: 'user-fraud',
      iconId: 'dollar-circle',
      text: '사기',
      width: 20,
      height: 20,
    },
    {
      id: 'user-external-party',
      iconId: 'question-mark-circle',
      text: '외부인 의심',
      width: 20,
      height: 20,
    },
    {
      id: 'user-harassment',
      iconId: 'skull-face',
      text: '괴롭힘 / 사이버폭력',
      width: 20,
      height: 20,
    },
    {
      id: 'user-other',
      iconId: 'null',
      text: '기타',
      width: 20,
      height: 20,
    },
  ],
};

// 댓글 신고 모달
const REPORT_COMMENT_TYPES = {
  modalId: 'report-comment-types',
  title: '댓글 신고',
  options: [
    {
      id: 'comment-personal-abuse',
      iconId: 'comment-exclamation-question-mark',
      text: '특정인에 대한 욕설 및 비하',
      width: 20,
      height: 20,
    },
    {
      id: 'comment-commercial-ad',
      iconId: 'dollar-circle',
      text: '상업적 광고 및 판매',
      width: 20,
      height: 20,
    },
    {
      id: 'comment-privacy-violation',
      iconId: 'x-shield',
      text: '개인정보 유출',
      width: 18,
      height: 20,
    },
    {
      id: 'comment-incitement-division',
      iconId: 'traffic-cone',
      text: '선동 및 분란 유발',
      width: 20,
      height: 20,
    },
    {
      id: 'comment-adult-content',
      iconId: 'hand-stop',
      text: '음란물 / 불건전한 만남 및 대화',
      width: 20,
      height: 22,
    },
    {
      id: 'comment-spam',
      iconId: 'list-x-circle',
      text: '스팸 / 무성의한 댓글',
      width: 20,
      height: 16,
    },
    {
      id: 'comment-other',
      iconId: 'null',
      text: '기타',
      width: 20,
      height: 20,
    },
  ],
};

// =================== 종류별 모달 모음 ===================

export const MORE_OPTION_MODAL = {
  POST_MORE_OPTION,
  MY_POST_MORE_OPTION,
  EXAM_REVIEW_MORE_OPTION,
  MY_EXAM_REVIEW_MORE_OPTION,
  COMMENT_MORE_OPTION,
  MY_COMMENT_MORE_OPTION,
};

export const CONFIRM_MODAL_TEXT = CONFIRM_MODAL;

export const TEXT_OPTION_MODAL_TEXT = { ALREADY_VERIFIED };

export const OPTION_MODAL = {
  REPORT_POST_TYPES,
  REPORT_EXAM_REVIEW_TYPES,
  REPORT_USER_TYPES,
  REPORT_COMMENT_TYPES,
};
