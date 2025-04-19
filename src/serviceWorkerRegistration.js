import { subscribeToPushNotification } from '@/feature/alert/lib/firebase-messaging';

export async function register() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );
    await subscribeToPushNotification(registration);
  } catch (error) {
    console.error(error);
  }
}
