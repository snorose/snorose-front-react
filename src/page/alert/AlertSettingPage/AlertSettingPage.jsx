import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import {
  BackAppBar,
  FetchLoading,
  ServerErrorFallback,
} from '@/shared/component';

import {
  useNotificationSettings,
  useUpdateNotificationSetting,
} from '@/feature/alert/hook';
import { SettingItem } from '@/feature/alert/component';

import style from './AlertSettingPage.module.css';

const content = {
  alert: `푸시 메시지와 알림함으로 소식을 전해드려요\n* OFF로 변경 시, 푸시&알림함 모두 꺼집니다`,
  advertisement: `광고성 알림을 받으려면\n먼저 ‘알림 받기’가 켜져 있어야 해요`,
  attendance: `매일 오후 10시에 출석 체크를 잊지 않도록\n알림으로 알려드려요`,
};

export default function AlertSettingPage() {
  return (
    <div className={style.container}>
      <BackAppBar title='알림 설정' />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={({ resetErrorBoundary }) => (
              <div className={style.errorFallback}>
                <ServerErrorFallback reset={resetErrorBoundary} />
              </div>
            )}
          >
            <Suspense
              fallback={
                <div className={style.loading}>
                  <FetchLoading />
                </div>
              }
            >
              <NotificationSettings />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

function NotificationSettings() {
  const { data: notificationSettings } = useNotificationSettings();
  const updateSettings = useUpdateNotificationSetting();

  return (
    <>
      <div className={style.alert}>
        <SettingItem
          title='알림 받기'
          content={content.alert}
          isEnabled={notificationSettings.required}
          onToggle={() => updateSettings.mutate({ type: 'required' })}
        />
        <SettingItem
          title='광고성 알림 받기'
          content={content.advertisement}
          isEnabled={notificationSettings.marketing}
          onToggle={() => updateSettings.mutate({ type: 'marketing' })}
          variant='blue'
          disabled={!notificationSettings.required}
        />
      </div>

      <div className={style.line}></div>

      <div className={style.attendance}>
        <SettingItem
          title='출석체크 알림'
          content={content.attendance}
          isEnabled={notificationSettings.attendance}
          onToggle={() => updateSettings.mutate({ type: 'attendance' })}
          variant='blue'
          disabled={!notificationSettings.required}
        />
      </div>
    </>
  );
}
