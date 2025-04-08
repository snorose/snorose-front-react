importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js'
);

class CustomPushEvent extends Event {
  constructor(data) {
    super('push');

    Object.assign(this, data);
    this.custom = true;
  }
}

self.addEventListener('push', (e) => {
  if (e.custom) return;

  const oldData = e.data;
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  e.stopImmediatePropagation();
  dispatchEvent(newEvent);
});

const firebaseConfig = {
  apiKey: 'AIzaSyC6bVJTwYpW-ffJ2j2HSY45FwXdXRA545k',
  projectId: 'snorose-c37c1',
  messagingSenderId: '120670270079',
  appId: '1:120670270079:web:e7ba0364bd1813ca73854a',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
