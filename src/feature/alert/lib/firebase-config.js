import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);

let messaging = null;
const isFcmSupported = await isSupported();

if (isFcmSupported) {
  messaging = getMessaging(firebaseApp);
} else {
  console.warn('이 브라우저에서 Firebase Messaging을 지원하지 않습니다.');
}

export { messaging };
