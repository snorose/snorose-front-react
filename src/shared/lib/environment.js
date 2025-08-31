const mediaQuery =
  '(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen), (display-mode: window-controls-overlay)';

export function isPWA() {
  const isStandalone =
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia(mediaQuery).matches;

  const isIOSStandalone =
    typeof navigator !== 'undefined' &&
    'standalone' in navigator &&
    navigator.standalone === true;

  return isStandalone || isIOSStandalone;
}

export function isMobile() {
  const nav = navigator;
  const ua = navigator.userAgent || '';

  // 1) Chromium 계열(안드)에서 가장 신뢰도 높은 신호
  if (nav.userAgentData?.mobile === true) return true;

  // 2) iOS: iPhone/iPod은 폰, iPad는 제외
  if (/\biPhone\b|\biPod\b/i.test(ua)) return true;
  if (/\biPad\b/i.test(ua)) return false;

  // iPadOS 13+: UA가 "Mac"로 위장하므로 따로 제외
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    return false;

  // 3) Android: UA에 'Mobile' 토큰이 있으면 보통 폰, 없으면 태블릿
  if (/Android/i.test(ua)) return /\bMobile\b/i.test(ua);

  return false;
}
