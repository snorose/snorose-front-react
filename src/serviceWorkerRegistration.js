import { subscribeToPushNotification } from '@/feature/alert/lib/firebase-messaging';

export async function register() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );
    const token = await subscribeToPushNotification(registration);
    console.log(token);
  } catch (error) {
    console.error(error);
  }
}
