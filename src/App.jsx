import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useFeatureIsOn } from '@growthbook/growthbook-react';

import { useAuth } from '@/shared/hook';
import { Navbar, Sidebar } from '@/shared/component';
import {
  detectDeviceInfo,
  detectInAppBrowser,
  findRouteByPath,
} from '@/shared/lib';

import { PushNotificationManager } from '@/feature/alert/lib';

import { routeList } from '@/router.js';

import styles from './App.module.css';

import {
  MAINTENANCE_START,
  MAINTENANCE_END,
} from '@/feature/maintenance/hook/useMaintenance';
import { MaintenancePage } from './page/maintenance';

function App() {
  const isEnabled = useFeatureIsOn('push-notification');
  const { pathname, key: locationKey } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;
  const { status } = useAuth();

  // 푸시 알림 설정
  useEffect(() => {
    const isInApp = detectInAppBrowser();

    if (!isInApp) {
      if (isEnabled && status === 'authenticated') {
        PushNotificationManager.init();
        PushNotificationManager.listenForegroundMessage();
      }
    }
  }, [isEnabled, status]);

  // 인앱 브라우저 감지
  useEffect(() => {
    const { platform } = detectDeviceInfo();
    const isInApp = detectInAppBrowser();

    if (platform === 'iOS' && isInApp) {
      const url = window.location.href;
      alert(
        '현재 인앱 브라우저에서는 일부 기능이 제한될 수 있습니다.\n사파리나 크롬에서 다시 열어주세요.\n주소가 클립보드에 복사되었습니다.'
      );

      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
    }
  }, [locationKey]);

  // 서버 점검 페이지 처리
  const now = new Date();
  const isMaintenance = now >= MAINTENANCE_START && now <= MAINTENANCE_END;
  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className={styles.app}>
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
