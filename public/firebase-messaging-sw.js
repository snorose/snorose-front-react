// public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyA9nIwXy3JBQ8w3Mm_Ms40UTlqCXS2dd04',
  authDomain: 'snorose-7516c.firebaseapp.com',
  projectId: 'snorose-7516c',
  storageBucket: 'snorose-7516c.firebasestorage.app',
  messagingSenderId: '339955796265',
  appId: '1:339955796265:web:fce8695ba25e8cca994f38',
  measurementId: 'G-DN38VGEJNE',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo192.png',
  });
});
