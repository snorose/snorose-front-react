export const BOARD_ID = Object.freeze({
  besookt: 20,
  'first-snow': 21,
  'large-snow': 22,
  'permanent-snow': 23,
  'exam-review': 32,
});

// 게시글 신고
export const POST_REPORT_TYPE_ENUM = Object.freeze({
  POST_PERSONAL_ABUSE: 'POST_PERSONAL_ABUSE',
  POST_COMMERCIAL_AD: 'POST_COMMERCIAL_AD',
  POST_ILLEGAL_DISTRIBUTION: 'POST_ILLEGAL_DISTRIBUTION',
  POST_PRIVACY_VIOLATION: 'POST_PRIVACY_VIOLATION',
  POST_INCITEMENT_DIVISION: 'POST_INCITEMENT_DIVISION',
  POST_ADULT_CONTENT: 'POST_ADULT_CONTENT',
  POST_INSINCERE_CONTENT: 'POST_INSINCERE_CONTENT',
  POST_HATEFUL_CONTENT: 'POST_HATEFUL_CONTENT',
});

export const POST_REPORT_TYPE_KOREAN_ENUM = Object.freeze({
  POST_PERSONAL_ABUSE: '특정인에 대한 욕설 및 비하',
  POST_COMMERCIAL_AD: '상업적 광고 및 판매글',
  POST_ILLEGAL_DISTRIBUTION: '불법촬영물 등의 유통',
  POST_PRIVACY_VIOLATION: '개인정보 유출',
  POST_INCITEMENT_DIVISION: '선동 및 분란 유발',
  POST_ADULT_CONTENT: '음란물/불건전한 만남 및 대화',
  POST_INSINCERE_CONTENT: '무성의한 게시',
  POST_HATEFUL_CONTENT: '타인에게 혐오감을 주는 게시글',
});

export const POST_REPORT_TYPE_MODAL_OPTION_CHILDREN = [
  {
    iconId: 'abuse-comment',
    IconWidth: 25,
    IconHeight: 18,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_PERSONAL_ABUSE,
    value: POST_REPORT_TYPE_ENUM.POST_PERSONAL_ABUSE,
  },
  {
    iconId: 'dollar',
    IconWidth: 25,
    IconHeight: 14,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_COMMERCIAL_AD,
    value: POST_REPORT_TYPE_ENUM.POST_COMMERCIAL_AD,
  },
  {
    iconId: 'camera',
    IconWidth: 25,
    IconHeight: 18,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_ILLEGAL_DISTRIBUTION,
    value: POST_REPORT_TYPE_ENUM.POST_ILLEGAL_DISTRIBUTION,
  },
  {
    iconId: 'ban',
    IconWidth: 18,
    IconHeight: 18,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_PRIVACY_VIOLATION,
    value: POST_REPORT_TYPE_ENUM.POST_PRIVACY_VIOLATION,
  },
  {
    iconId: 'flag',
    IconWidth: 22,
    IconHeight: 22,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_INCITEMENT_DIVISION,
    value: POST_REPORT_TYPE_ENUM.POST_INCITEMENT_DIVISION,
  },
  {
    iconId: 'adult',
    IconWidth: 18,
    IconHeight: 18,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_ADULT_CONTENT,
    value: POST_REPORT_TYPE_ENUM.POST_ADULT_CONTENT,
  },
  {
    iconId: 'horizontal-dot3',
    IconWidth: 18,
    IconHeight: 18,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_INSINCERE_CONTENT,
    value: POST_REPORT_TYPE_ENUM.POST_INSINCERE_CONTENT,
  },
  {
    iconId: 'user-disgust',
    IconWidth: 19,
    IconHeight: 21,
    text: POST_REPORT_TYPE_KOREAN_ENUM.POST_HATEFUL_CONTENT,
    value: POST_REPORT_TYPE_ENUM.POST_HATEFUL_CONTENT,
  },
];

// 유저 신고
export const USER_REPORT_TYPE_ENUM = Object.freeze({
  USER_IMPERSONATION: 'USER_IMPERSONATION',
  USER_FRAUD: 'USER_FRAUD',
  USER_EXTERNAL_PARTY: 'USER_EXTERNAL_PARTY',
  USER_HARASSMENT: 'USER_HARASSMENT',
  USER_OTHER: 'USER_OTHER',
});

export const USER_REPORT_TYPE_KOREAN_ENUM = Object.freeze({
  USER_IMPERSONATION: '타인 사칭',
  USER_FRAUD: '사기',
  USER_EXTERNAL_PARTY: '외부인',
  USER_HARASSMENT: '괴롭힘/사이버폭력',
  USER_OTHER: '기타',
});

export const USER_REPORT_TYPE_MODAL_OPTION_CHILDREN = [
  {
    iconId: 'user-sunglasses',
    IconWidth: 18,
    IconHeight: 21,
    text: USER_REPORT_TYPE_KOREAN_ENUM.USER_IMPERSONATION,
    value: USER_REPORT_TYPE_ENUM.USER_IMPERSONATION,
  },
  {
    iconId: 'ban',
    IconWidth: 18,
    IconHeight: 18,
    text: USER_REPORT_TYPE_KOREAN_ENUM.USER_FRAUD,
    value: USER_REPORT_TYPE_ENUM.USER_FRAUD,
  },
  {
    iconId: 'user-stranger',
    IconWidth: 18,
    IconHeight: 21,
    text: USER_REPORT_TYPE_KOREAN_ENUM.USER_EXTERNAL_PARTY,
    value: USER_REPORT_TYPE_ENUM.USER_EXTERNAL_PARTY,
  },
  {
    iconId: 'abuse-comment',
    IconWidth: 25,
    IconHeight: 18,
    text: USER_REPORT_TYPE_KOREAN_ENUM.USER_HARASSMENT,
    value: USER_REPORT_TYPE_ENUM.USER_HARASSMENT,
  },
  {
    iconId: 'horizontal-dot3',
    IconWidth: 18,
    IconHeight: 18,
    text: USER_REPORT_TYPE_KOREAN_ENUM.USER_OTHER,
    value: USER_REPORT_TYPE_ENUM.USER_OTHER,
  },
];

// 댓글 신고
export const COMMENT_REPORT_TYPE_ENUM = Object.freeze({
  COMMENT_PERSONAL_ABUSE: 'COMMENT_PERSONAL_ABUSE',
  COMMENT_COMMERCIAL_AD: 'COMMENT_COMMERCIAL_AD',
  COMMENT_PRIVACY_VIOLATION: 'COMMENT_PRIVACY_VIOLATION',
  COMMENT_INCITEMENT_DIVISION: 'COMMENT_INCITEMENT_DIVISION',
  COMMENT_ADULT_CONTENT: 'COMMENT_ADULT_CONTENT',
  COMMENT_SPAM: 'COMMENT_SPAM',
  COMMENT_OTHER: 'COMMENT_OTHER',
});

export const COMMENT_REPORT_TYPE_KOREAN_ENUM = Object.freeze({
  COMMENT_PERSONAL_ABUSE: '특정인에 대한 욕설 및 비하',
  COMMENT_COMMERCIAL_AD: '상업적 광고 및 판매 댓글',
  COMMENT_PRIVACY_VIOLATION: '개인정보 유출',
  COMMENT_INCITEMENT_DIVISION: '선동 및 분란 유발',
  COMMENT_ADULT_CONTENT: '음란물/불건전한 만남 및 대화',
  COMMENT_SPAM: '스팸/무성의한 댓글',
  COMMENT_OTHER: '기타',
});

export const COMMENT_REPORT_TYPE_MODAL_OPTION_CHILDREN = [
  {
    iconId: 'abuse-comment',
    IconWidth: 25,
    IconHeight: 18,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_PERSONAL_ABUSE,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_PERSONAL_ABUSE,
  },
  {
    iconId: 'dollar',
    IconWidth: 25,
    IconHeight: 14,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_COMMERCIAL_AD,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_COMMERCIAL_AD,
  },
  {
    iconId: 'ban',
    IconWidth: 18,
    IconHeight: 18,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_PRIVACY_VIOLATION,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_PRIVACY_VIOLATION,
  },
  {
    iconId: 'flag',
    IconWidth: 22,
    IconHeight: 22,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_INCITEMENT_DIVISION,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_INCITEMENT_DIVISION,
  },
  {
    iconId: 'adult',
    IconWidth: 18,
    IconHeight: 18,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_ADULT_CONTENT,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_ADULT_CONTENT,
  },
  {
    iconId: 'comment-gray',
    IconWidth: 18,
    IconHeight: 18,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_SPAM,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_SPAM,
  },
  {
    iconId: 'horizontal-dot3',
    IconWidth: 19,
    IconHeight: 21,
    text: COMMENT_REPORT_TYPE_KOREAN_ENUM.COMMENT_OTHER,
    value: COMMENT_REPORT_TYPE_ENUM.COMMENT_OTHER,
  },
];
