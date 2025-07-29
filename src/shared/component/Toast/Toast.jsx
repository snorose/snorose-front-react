import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useToastContext } from '@/shared/context/ToastContext';
import { Icon } from '@/shared/component';

import styles from './Toast.module.css';

export default function Toast({ toast }) {
  const { removeToast } = useToastContext();
  const toastRef = useRef(null);

  const toastConfig = {
    error: {
      icon: 'info-triangle',
      className: styles.error,
    },
    default: {
      icon: 'info-circle',
      className: styles.default,
    },
    defaultDark: {
      icon: 'info-circle',
      className: styles.defaultDark,
    },
  };

  const type = toast.type || 'default';
  const config = toastConfig[type] || toastConfig.default;
  const iconId = config.icon;
  const toastClassName = `${styles.toast} ${config.className || ''}`;

  useEffect(() => {
    const fadeOut = setTimeout(() => {
      if (toastRef.current) {
        toastRef.current.style.opacity = '0';
      }
    }, 3000);

    const unmount = setTimeout(() => {
      removeToast(toast.message);
    }, 3500);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(unmount);
    };
  }, [toast]);

  const root = document.getElementById('toast');
  if (!root) return null;

  return createPortal(
    <div ref={toastRef} className={toastClassName}>
      <Icon id={iconId} width={21} height={20} />
      <p className={styles.message}>{toast.message}</p>
    </div>,
    root
  );
}
