import { messaging } from '@/firebase';

import { getToken, onMessage } from 'firebase/messaging';

export const requestPermission = async () => {
  console.log('Requesting permission...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('Notification permission granted.');
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('No registration token available.');
    }
  } else {
    console.log('Permission denied.');
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Foreground message received', payload);
      resolve(payload);
    });
  });
