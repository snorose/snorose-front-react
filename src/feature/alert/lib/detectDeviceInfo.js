export function detectDeviceInfo() {
  // 최신 브라우저 (userAgentData 사용 가능)
  if (navigator.userAgentData) {
    const { mobile: isMobile, platform } = navigator.userAgentData;

    return { isMobile, platform };
  }

  // 구형 브라우저 (userAgent fallback)
  const ua = navigator.userAgent;

  const isMobile = /Mobi/i.test(ua) && /Android|iPhone/i.test(ua);

  const isAndroid = /Android/i.test(ua);
  const isLinux = /Linux/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/i.test(ua) && !window.MSStream;
  const isMac = /Macintosh/i.test(ua);
  const isWindows = /Windows/i.test(ua);

  /**
   * Android 기기의 경우 커널 OS 때문에 Linux가 포함되어 있는 경우가 있습니다.
   * Linux 단독으로 있는 경우만 Linux 운영체제 이므로 Android를 우선적으로 체크합니다.
   */

  let platform = 'Unknown';

  if (isAndroid) {
    platform = 'Android';
  } else if (isLinux) {
    platform = 'Linux';
  } else if (isIOS) {
    platform = 'iOS';
  } else if (isMac) {
    platform = 'macOS';
  } else if (isWindows) {
    platform = 'Windows';
  }

  return { isMobile, platform };
}
