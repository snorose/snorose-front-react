import { getToken, isSupported } from 'firebase/messaging';
import { messaging } from './firebase-config';

import { sendFCMToken } from '@/apis';

import { ERROR_MESSAGE } from '@/feature/alert/constant';

export class PushNotificationManager {
  static #registration = null;

  static async registerServiceWorker() {
    const isFcmSupported = await isSupported();

    if (!isFcmSupported) {
      console.warn('이 브라우저에서는 푸시 알림을 지원하지 않습니다.');
      return;
    }

    try {
      let registration = await navigator.serviceWorker.getRegistration();

      if (registration) {
        this.#registration = registration;
        return;
      }

      registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js'
      );

      this.#registration = registration;
    } catch (error) {
      console.error('서비스 워커 등록 실패:', error);
    }
  }

  static async ensurePermission() {
    const current = Notification.permission;

    if (current === 'granted') return true;
    if (current === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  static async subscribe(deviceType) {
    if (!this.#registration) {
      await PushNotificationManager.registerServiceWorker();

      if (!this.#registration) {
        throw new Error(ERROR_MESSAGE.SW_REGISTER_FAILED);
      }
    }

    let token;

    try {
      token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
        serviceWorkerRegistration: this.#registration,
      });
    } catch (error) {
      console.error('FCM 토큰 발급 실패:', error);
      throw new Error(ERROR_MESSAGE.FCM_TOKEN_ISSUE_FAILED);
    }

    if (!token) {
      console.warn('FCM 토큰을 받을 수 없습니다.');
      throw new Error(ERROR_MESSAGE.FCM_TOKEN_EMPTY);
    }

    const savedToken = localStorage.getItem(
      process.env.REACT_APP_FCM_TOKEN_KEY
    );

    if (!savedToken || savedToken !== token) {
      try {
        await sendFCMToken(token, deviceType);
        localStorage.setItem(process.env.REACT_APP_FCM_TOKEN_KEY, token);
      } catch (error) {
        console.error('푸시 알림 구독 실패: ', error);
        throw new Error(ERROR_MESSAGE.SUBSCRIBE_FAILED);
      }
    }
  }
}
