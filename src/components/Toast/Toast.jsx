import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useToastContext } from '../../contexts/ToastContext.jsx';

import styles from './Toast.module.css';

export default function Toast({ toast }) {
  const { removeToast } = useToastContext();
  const toastRef = useRef();

  useEffect(() => {
    const fadeOut = setTimeout(() => {
      toastRef.current.style.opacity = '0';
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

  return createPortal(
    <div ref={toastRef} className={styles.toast}>
      <p className={styles.message}>{toast.message}</p>
    </div>,
    root
  );
}
