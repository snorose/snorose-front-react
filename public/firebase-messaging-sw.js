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

messaging.onBackgroundMessage((payload) => {});
