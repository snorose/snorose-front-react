import { getToken, isSupported } from 'firebase/messaging';
import { messaging } from './firebase-config';

import { sendFCMToken } from '@/apis';

import { AppError } from '@/shared/lib';

import { isIOS } from '@/feature/alert/lib';
import { ERROR_CODE, ERROR_MESSAGE } from '@/feature/alert/constant';

export class PushNotificationManager {
  static #registration = null;

  static async registerServiceWorker() {
    this.#assertSupport();

    try {
      let registration = await navigator.serviceWorker.getRegistration();

      if (registration) {
        this.#registration = registration;
        return;
      }

      this.#registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js'
      );
    } catch (error) {
      throw new AppError(
        ERROR_CODE.SW_REGISTER_FAILED,
        ERROR_MESSAGE.SW_REGISTER_FAILED
      );
    }
  }

  static async #assertSupport() {
    const isFcmSupported = await isSupported().catch(() => false);

    if (!isFcmSupported) {
      throw new AppError(
        ERROR_CODE.SW_ENV_UNSUPPORTED,
        ERROR_MESSAGE.SW_ENV_UNSUPPORTED
      );
    }
  }

  static async ensurePermission() {
    const current = Notification.permission;

    if (current === 'granted') return;
    if (current === 'denied') {
      const message = isIOS()
        ? ERROR_MESSAGE.PERMISSION_DENIED_IOS
        : ERROR_MESSAGE.PERMISSION_DENIED_ANDROID;

      throw new AppError(ERROR_CODE.PERMISSION_BLOCKED, message);
    }

    const result = await Notification.requestPermission();

    if (result === 'granted') {
      return;
    }

    throw new AppError(ERROR_CODE.PERMISSION_JUST_DENIED);
  }

  static async issueToken() {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
        serviceWorkerRegistration: this.#registration ?? undefined,
      });

      if (!token) {
        throw new AppError(
          ERROR_CODE.FCM_TOKEN_EMPTY,
          ERROR_MESSAGE.FCM_TOKEN_EMPTY
        );
      }

      return token;
    } catch (error) {
      throw new AppError(
        ERROR_CODE.FCM_TOKEN_ISSUE_FAILED,
        ERROR_MESSAGE.FCM_TOKEN_ISSUE_FAILED
      );
    }
  }

  static async syncWithServer(token, deviceType) {
    try {
      await sendFCMToken(token, deviceType);
      this.#setCachedToken(token);
    } catch (error) {
      throw new AppError(
        ERROR_CODE.FCM_TOKEN_SYNC_FAILED,
        ERROR_MESSAGE.FCM_TOKEN_SYNC_FAILED
      );
    }
  }

  static isTokenChanged(newToken) {
    const saved = this.#getCachedToken();
    return !saved || saved !== newToken;
  }

  static #getCachedToken() {
    return localStorage.getItem(process.env.REACT_APP_FCM_TOKEN_KEY);
  }

  static #setCachedToken(token) {
    const key = process.env.REACT_APP_FCM_TOKEN_KEY;
    localStorage.setItem(key, token);
  }
}
