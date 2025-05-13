let registrationPromise;

export function register() {
  if (!('serviceWorker' in navigator)) return;

  registrationPromise = navigator.serviceWorker.register(
    '/firebase-messaging-sw.js'
  );
}

export function getRegistration() {
  if (!registrationPromise) {
    throw new Error(
      'Service worker not initialized. Did you forget to call initServiceWorker()?'
    );
  }

  return registrationPromise;
}
