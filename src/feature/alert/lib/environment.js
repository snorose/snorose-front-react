export function isPWA() {
  if (typeof window === 'undefined') return false;

  // iOS: 오직 홈 화면 실행일 때만 true
  if (isIOS()) {
    return navigator.standalone === true;
  }

  // 2) Display Mode 기반 (표준) — 설치 실행만 긍정
  const displayModes = ['standalone', 'fullscreen', 'window-controls-overlay'];
  return displayModes.some(
    (mode) => window.matchMedia?.(`(display-mode: ${mode})`).matches
  );
}

export function getDeviceFormFactor() {
  const nav = navigator;
  const ua = navigator.userAgent || '';

  // 1) Chromium 계열(안드)에서 가장 신뢰도 높은 신호
  if (nav.userAgentData?.mobile === true) return 'MOBILE';

  // 2) iOS: iPhone/iPod은 폰, iPad는 제외
  if (/\biPhone\b|\biPod\b/i.test(ua)) return 'MOBILE';
  if (/\biPad\b/i.test(ua)) return 'OTHER';

  // iPadOS 13+: UA가 "Mac"로 위장하므로 따로 제외
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    return 'OTHER';

  // 3) Android: UA에 'Mobile' 토큰이 있으면 보통 폰, 없으면 태블릿
  if (/Android/i.test(ua)) return /\bMobile\b/i.test(ua);

  return 'OTHER';
}

export function isMobile() {
  const ua = navigator.userAgent;

  return /Android.+Mobile|iPhone|iPod/i.test(ua);
}

export function isIOS() {
  const ua = navigator.userAgent;
  const isIOSDevice = /iPhone|iPod/.test(ua);
  const isIpadOS13Up = ua.includes('Macintosh') && 'ontouchend' in document;
  return isIOSDevice || isIpadOS13Up;
}

export function isNotificationUnsupported() {
  if (!isMobile()) return true;
  if (isIOS() && !isPWA()) return true;
  return false;
}
