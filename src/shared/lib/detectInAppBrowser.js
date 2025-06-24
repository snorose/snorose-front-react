export function detectInAppBrowser() {
  const ua = window.navigator.userAgent.toLowerCase();
  console.log(ua);

  const isInApp =
    ua.includes('kakaotalk') ||
    ua.includes('instagram') ||
    ua.includes('naver') ||
    ua.includes('line') ||
    ua.includes('fbav') ||
    ua.includes('inapp');

  return isInApp;
}
