import { getToken } from 'firebase/messaging';
import { messaging } from './firebase-config';

export const subscribeToPushNotification = async (registration) => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      // 백엔드로 token 전달
      // await fetch('/api/register-token', {
      //   method: 'POST',
      //   body: JSON.stringify({ token }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
    } catch (error) {
      console.error(error);
    }
  }
};
