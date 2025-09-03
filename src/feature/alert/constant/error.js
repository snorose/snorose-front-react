export const ERROR_MESSAGE = Object.freeze({
  SW_ENV_UNSUPPORTED: `푸시 알림을 사용할 수 없는 환경이에요.\n지원되는 브라우저를 이용해 주세요.`,
  SW_REGISTER_FAILED: `알림 초기화에 실패했어요.\n새로고침 후 다시 시도해 주세요.`,
  PERMISSION_DENIED_PWA: `알림을 받고 싶다면 일반 브라우저로 이동해서\n알림 권한을 허용으로 바꿔주세요.`,
  PERMISSION_DENIED_WEB: `알림을 받고 싶다면 브라우저 알림 권한을\n허용으로 바꿔주세요.`,
  FCM_TOKEN_EMPTY: `토큰을 발급받지 못했어요.\n잠시 후 다시 시도해 주세요.`,
  FCM_TOKEN_ISSUE_FAILED: `푸시 토큰 발급에 실패했어요.\n잠시 후 다시 시도해 주세요.`,
  FCM_TOKEN_SYNC_FAILED: `이 기기에서는 푸시 알림 등록을 지원하지 않아요.\n스마트폰에서 알림을 켜주세요.`,
});

export const ERROR_CODE = Object.freeze({
  SW_ENV_UNSUPPORTED: 'SW_ENV_UNSUPPORTED',
  SW_REGISTER_FAILED: 'SW_REGISTER_FAILED',
  PERMISSION_BLOCKED: 'PERMISSION_BLOCKED', // (기존부터) 이미 차단됨: 설정에서 막힘
  PERMISSION_JUST_DENIED: 'PERMISSION_JUST_DENIED',
  FCM_TOKEN_EMPTY: 'FCM_TOKEN_EMPTY',
  FCM_TOKEN_ISSUE_FAILED: 'FCM_TOKEN_ISSUE_FAILED',
  FCM_TOKEN_SYNC_FAILED: 'FCM_TOKEN_SYNC_FAILED',
});
