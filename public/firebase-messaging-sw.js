importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyC6bVJTwYpW-ffJ2j2HSY45FwXdXRA545k',
  projectId: 'snorose-c37c1',
  messagingSenderId: '120670270079',
  appId: '1:120670270079:web:e7ba0364bd1813ca73854a',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message:',
    payload
  );

  const { title, body, url } = payload.data;

  const notificationOptions = {
    body,
    data: { url },
  };

  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // 이미 열린 창이 있으면 focus
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && 'focus' in client) {
            return client.focus();
          }
        }
        // 없으면 새 탭 열기
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
