import { getToken } from 'firebase/messaging';
import { messaging } from './firebase-config';

class PushNotificationManager {
  private registration?: ServiceWorkerRegistration;
  private fcmToken?: string;

  async init(): Promise<void> {
    const permissionGranted = await this.ensurePermission();
    if (!permissionGranted) return;

    this.registration = await this.ensureServiceWorker();
    this.fcmToken = await this.ensureFcmToken();
  }

  private async ensurePermission(): Promise<boolean> {
    const current = Notification.permission;

    if (current === 'granted') return true;
    if (current === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  private async ensureServiceWorker(): Promise<ServiceWorkerRegistration> {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker is not supported');
    }

    if (this.registration) return this.registration;

    this.registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    return this.registration;
  }

  private async ensureFcmToken(): Promise<string | undefined> {
    if (!this.registration) throw new Error('Service worker not registered');

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
      serviceWorkerRegistration: this.registration,
    });

    if (!token) return undefined;

    const saved = localStorage.getItem('fcm_token');
    if (saved !== token) {
      await this.sendTokenToServer(token);
      localStorage.setItem('fcm_token', token);
    }

    return token;
  }

  private async sendTokenToServer(token: string): Promise<void> {
    await fetch('/api/register-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async removeToken(): Promise<void> {
    localStorage.removeItem('fcm_token');
    // 서버에 삭제 요청을 보내는 API가 있다면 호출
  }

  getToken(): string | undefined {
    return this.fcmToken;
  }
}

export const pushNotificationManager = new PushNotificationManager();
