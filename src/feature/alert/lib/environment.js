export function isWebPushSupported() {
  return (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

function isAndroidPhone() {
  const isSmartPhone = navigator.userAgentData?.mobile;

  if (isSmartPhone !== undefined) {
    return isSmartPhone;
  }

  // userAgentData을 지원하지 않는 경우의 fallback
  const ua = navigator.userAgent || '';
  return /Android/i.test(ua) && /Mobile/i.test(ua);
}

export function isIPhone() {
  return navigator.platform === 'iPhone';
}

function isIOSPWA() {
  return (
    typeof navigator.standalone !== 'undefined' && navigator.standalone === true
  );
}

export function canUseAlertSetting() {
  if (!isWebPushSupported()) return false;

  if (isAndroidPhone()) return true;

  if (isIPhone() && isIOSPWA()) return true;

  return false;
}

/**
 * MOBILE: 스마트폰
 * TABLET: 태블릿 PC
 * PC: 데스크톱/노트북
 * OTHER: 그 외
 */
export function getDeviceType() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';

  if (isIPhone()) return 'MOBILE';
  if (isAndroidPhone()) return 'MOBILE';

  if (platform === 'iPad') return 'TABLET';
  if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'TABLET';
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'TABLET';

  if (/Macintosh|Windows|Win32|Win64|Linux/i.test(ua)) return 'PC';

  return 'OTHER';
}
