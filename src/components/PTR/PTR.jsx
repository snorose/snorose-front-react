import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components';
import styles from './PTR.module.css';

export default function PTR({ children, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);
  const [startY, setStartY] = useState(undefined);
  const containerRef = useRef(null);

  function handleStart(event) {
    const clientY =
      (event.touches && event.touches[0] && event.touches[0].clientY) ||
      event.clientY;
    setStartY(clientY);
    event.preventDefault();
  }

  function handleMove(event) {
    const clientY =
      (event.touches && event.touches[0] && event.touches[0].clientY) ||
      event.clientY;
    if (startY !== undefined) {
      const pullDistance = clientY - startY;

      if (pullDistance > 0) {
        event.preventDefault();

        if (pullDistance > 80 && containerRef.current) {
          containerRef.current.style.transform = 'translate(0, 30px)';
          containerRef.current.style.transition = '0.3s';
          setRefreshing(true);
        }
      }
    }
  }

  function handleEnd() {
    if (refreshing) {
      const refreshPromise = onRefresh();
      const timeoutId = setTimeout(() => {
        setRefreshing(false);
        if (containerRef.current) {
          containerRef.current.style.transform = 'translate(0,0)';
        }
      }, 3000);

      refreshPromise.finally(() => {
        clearTimeout(timeoutId);
        setRefreshing(false);
        if (containerRef.current) {
          containerRef.current.style.transform = 'translate(0,0)';
        }
      });
    }
    setStartY(undefined);
  }

  useEffect(() => {
    const options = { passive: false };

    document.addEventListener('touchstart', handleStart, options);
    document.addEventListener('touchmove', handleMove, options);
    document.addEventListener('touchend', handleEnd, options);
    document.addEventListener('mousedown', handleStart, options);
    document.addEventListener('mousemove', handleMove, options);
    document.addEventListener('mouseup', handleEnd, options);

    return () => {
      document.removeEventListener('touchstart', handleStart, options);
      document.removeEventListener('touchmove', handleMove, options);
      document.removeEventListener('touchend', handleEnd, options);
      document.removeEventListener('mousedown', handleStart, options);
      document.removeEventListener('mousemove', handleMove, options);
      document.removeEventListener('mouseup', handleEnd, options);
    };
  }, [refreshing, startY, onRefresh]);

  return (
    <div ref={containerRef} className={styles.ptrContainer}>
      {refreshing ? (
        <div className={styles.refreshBox}>
          <div className={styles.refreshIcon}>
            <Icon id='cloud' width='34' height='21' />
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}
