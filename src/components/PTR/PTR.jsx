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
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    return () => {
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('mousedown', handleStart);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
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
