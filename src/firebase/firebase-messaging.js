// src/firebase/firebase-messaging.js
import { messaging } from './firebase-config';
import { getToken, onMessage } from 'firebase/messaging';

export const requestPermission = async () => {
  console.log('푸시 알림 권한 요청 중...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('알림 권한이 허용됨');
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });
      console.log('FCM 토큰:', token);
      return token;
    } catch (error) {
      console.error('FCM 토큰 가져오기 실패:', error);
    }
  } else {
    console.log('알림 권한이 거부됨');
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('포그라운드 메시지 수신', payload);
      resolve(payload);
    });
  });
