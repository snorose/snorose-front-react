import { getToken, isSupported, onMessage } from 'firebase/messaging';
import { messaging } from './firebase-config';

export class PushNotificationManager {
  static async init() {
    const registration = await this.#registerServiceWorker();
    const granted = await this.#ensurePermission();

    if (!granted) return;

    return this.#subscribe(registration);
  }

  static async #registerServiceWorker() {
    const isFcmSupported = await isSupported();

    if (!isFcmSupported) {
      console.warn('이 브라우저에서는 푸시 알림을 지원하지 않습니다.');
      return;
    }

    try {
      let registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        return registration;
      }

      registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js'
      );
      return registration;
    } catch (error) {
      console.error('서비스 워커 등록 실패:', error);
      return;
    }
  }

  static async #ensurePermission() {
    const current = Notification.permission;

    if (current === 'granted') return true;
    if (current === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  static async #subscribe(registration) {
    if (!registration) {
      console.warn(
        'Service worker 등록 정보가 없습니다. 푸시 구독을 건너뜁니다.'
      );
      return;
    }

    let token;

    try {
      token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
    } catch (error) {
      console.error('FCM 토큰 발급 실패:', error);
      return;
    }

    if (!token) {
      console.warn('FCM 토큰을 받을 수 없습니다.');
      return;
    }

    const savedToken = localStorage.getItem(
      process.env.REACT_APP_FCM_TOKEN_KEY
    );

    if (!savedToken || savedToken !== token) {
      try {
        await this.#sendTokenToServer(token);
        localStorage.setItem(process.env.REACT_APP_FCM_TOKEN_KEY, token);
      } catch (error) {
        console.error('푸시 알림 구독 실패: ', error);
      }
    }
  }

  static async #sendTokenToServer(token) {
    await fetch('/api/register-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static async listenForegroundMessage() {
    onMessage(messaging, async (payload) => {
      const isFcmSupported = await isSupported();

      if (!isFcmSupported) {
        return;
      }

      if (Notification.permission !== 'granted') {
        return;
      }

      const { title, body } = payload.notification;

      try {
        const registration = await navigator.serviceWorker.getRegistration();

        if (registration) {
          registration.showNotification(title, { body });
        }
      } catch (error) {
        console.error('❌ 포그라운드 알림 수신 중 오류:', error);
      }
    });
  }
}
