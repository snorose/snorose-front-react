export const BOARD_ID = Object.freeze({
  besookt: 20,
  'first-snow': 21,
  'large-snow': 22,
  'permanent-snow': 23,
  'exam-review': 32,
});

export const REPORT_TYPE_ENUM = Object.freeze({
  POST_PERSONAL_ABUSE: 'POST_PERSONAL_ABUSE',
  POST_COMMERCIAL_AD: 'POST_COMMERCIAL_AD',
  POST_ILLEGAL_DISTRIBUTION: 'POST_ILLEGAL_DISTRIBUTION',
  POST_PRIVACY_VIOLATION: 'POST_PRIVACY_VIOLATION',
  POST_INCITEMENT_DIVISION: 'POST_INCITEMENT_DIVISION',
  POST_INSINCERE_CONTENT: 'POST_INSINCERE_CONTENT',
  POST_HATEFUL_CONTENT: 'POST_HATEFUL_CONTENT',
});

export const REPORT_TYPE_KOREAN_ENUM = Object.freeze({
  POST_PERSONAL_ABUSE: '특정인에 대한 욕설 및 비하',
  POST_COMMERCIAL_AD: '상업적 광고 및 판매글',
  POST_ILLEGAL_DISTRIBUTION: '불법촬영물 등을 유통',
  POST_PRIVACY_VIOLATION: '개인정보 유출',
  POST_INCITEMENT_DIVISION: '선동 및 분란 유발',
  POST_INSINCERE_CONTENT: '무성의한 게시',
  POST_HATEFUL_CONTENT: '타인에게 혐오감을 주는 게시물',
  // '음란물/불건전한 만남 및 대화' 추가 필요
});

export const REPORT_TYPE_MODAL_OPTION_CHILDREN = [
  {
    iconId: 'abuse-comment',
    IconWidth: 25,
    IconHeight: 18,
    text: REPORT_TYPE_KOREAN_ENUM.POST_PERSONAL_ABUSE,
    value: REPORT_TYPE_ENUM.POST_PERSONAL_ABUSE,
  },
  {
    iconId: 'dollar',
    IconWidth: 25,
    IconHeight: 14,
    text: REPORT_TYPE_KOREAN_ENUM.POST_COMMERCIAL_AD,
    value: REPORT_TYPE_ENUM.POST_COMMERCIAL_AD,
  },
  {
    iconId: 'camera',
    IconWidth: 25,
    IconHeight: 18,
    text: REPORT_TYPE_KOREAN_ENUM.POST_ILLEGAL_DISTRIBUTION,
    value: REPORT_TYPE_ENUM.POST_ILLEGAL_DISTRIBUTION,
  },
  {
    iconId: 'ban',
    IconWidth: 18,
    IconHeight: 18,
    text: REPORT_TYPE_KOREAN_ENUM.POST_PRIVACY_VIOLATION,
    value: REPORT_TYPE_ENUM.POST_PRIVACY_VIOLATION,
  },
  {
    iconId: 'flag',
    IconWidth: 22,
    IconHeight: 22,
    text: REPORT_TYPE_KOREAN_ENUM.POST_INCITEMENT_DIVISION,
    value: REPORT_TYPE_ENUM.POST_INCITEMENT_DIVISION,
  },
  {
    iconId: 'adult',
    IconWidth: 18,
    IconHeight: 18,
    text: REPORT_TYPE_KOREAN_ENUM.POST_INSINCERE_CONTENT,
    value: REPORT_TYPE_ENUM.POST_INSINCERE_CONTENT,
  },
  {
    iconId: 'horizontal-dot3',
    IconWidth: 18,
    IconHeight: 4,
    text: REPORT_TYPE_KOREAN_ENUM.POST_HATEFUL_CONTENT,
    value: REPORT_TYPE_ENUM.POST_HATEFUL_CONTENT,
  },
];
