// src/firebase/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyA9nIwXy3JBQ8w3Mm_Ms40UTlqCXS2dd04',
  authDomain: 'snorose-7516c.firebaseapp.com',
  projectId: 'snorose-7516c',
  storageBucket: 'snorose-7516c.firebasestorage.app',
  messagingSenderId: '339955796265',
  appId: '1:339955796265:web:fce8695ba25e8cca994f38',
  measurementId: 'G-DN38VGEJNE',
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };
