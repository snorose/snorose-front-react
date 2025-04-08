import { requestPermission } from './feature/alert/lib/firebase-messaging';

export function register() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(async (registration) => {
        console.log('✅ 서비스 워커 등록 성공:', registration);

        // 🔑 FCM 토큰 요청 (서비스 워커 등록된 후)
        const token = await requestPermission(registration);
        return token;
      })
      .catch((error) => {
        console.error('❌ 서비스 워커 등록 실패:', error);
      });
  }
}
