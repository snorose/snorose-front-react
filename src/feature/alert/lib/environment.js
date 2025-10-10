const MAX_SMARTPHONE_WIDTH = 600;

export function isWebPushSupported() {
  return (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

function isSmallTouchDevice() {
  const isTouch =
    ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ||
    'ontouchstart' in window;

  if (!isTouch) return false;

  return window.innerWidth <= MAX_SMARTPHONE_WIDTH;
}

export function isIOSPWA() {
  return (
    typeof navigator.standalone !== 'undefined' && navigator.standalone === true
  );
}

export function canUseAlertSetting() {
  if (!isWebPushSupported()) return false;

  if (isIOSPWA()) {
    return isSmallTouchDevice();
  }

  return isSmallTouchDevice();
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

  if (isSmallTouchDevice()) return 'MOBILE';

  if (platform === 'iPad') return 'TABLET';
  if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'TABLET';
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'TABLET';

  if (/Macintosh|Windows|Win32|Win64|Linux/i.test(ua)) return 'PC';

  return 'OTHER';
}
