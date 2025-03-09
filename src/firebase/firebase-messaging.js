import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase-config';

export const requestPermission = async () => {
  console.log('푸시 알림 권한 요청 중...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('알림 권한이 허용됨');

    try {
      await getFCMToken();
    } catch (error) {
      console.error('FCM 토큰 가져오기 실패:', error);
    }
  } else {
    console.log('알림 권한이 거부됨');
  }
};

const getFCMToken = async () => {
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  console.log('FCM 토큰:', token);

  // await fetch('/api/register-token', {
  //   method: 'POST',
  //   body: JSON.stringify({ token }),
  //   headers: { 'Content-Type': 'application/json' },
  // });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
