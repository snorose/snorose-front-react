import { getToken } from 'firebase/messaging';
import { messaging } from './firebase-config';

export const subscribeToPushNotification = async (registration) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log('Token:', token);
    alert(token);

    // 백엔드로 token 전달
    // await fetch('/api/register-token', {
    //   method: 'POST',
    //   body: JSON.stringify({ token }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  } catch (error) {
    console.error(error);
  }
};

// const savedToken = localStorage.getItem('fcm_token');

// const token = await getToken(...);
// if (token && token !== savedToken) {
//   await sendTokenToServer(token);
//   localStorage.setItem('fcm_token', token);
// }
