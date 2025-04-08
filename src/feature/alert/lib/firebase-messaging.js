import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase-config';

export const requestPermission = async (registration) => {
  console.log('알림 권한 요청 중...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('알림 권한 허용됨');

    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY, // ✅ 크롬, 파이어폭스, 엣지에서 필요
        serviceWorkerRegistration: registration,
      });

      console.log('FCM 토큰:', token);
      return token;
      // await fetch('/api/register-token', {
      //   method: 'POST',
      //   body: JSON.stringify({ token }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
    } catch (error) {
      console.error('FCM 토큰 가져오기 실패:', error);
      return '';
    }
  } else {
    console.log('알림 권한 거부됨');
    return '';
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
