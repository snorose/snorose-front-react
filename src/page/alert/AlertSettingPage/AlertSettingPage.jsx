import { Suspense, useContext, useReducer } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { AppError } from '@/shared/lib';
import { ModalContext } from '@/shared/context/ModalContext';
import { useToast } from '@/shared/hook';
import {
  BackAppBar,
  ConfirmModal,
  FetchLoading,
  ServerErrorFallback,
} from '@/shared/component';
import { CONFIRM_MODAL_TEXT } from '@/shared/constant';

import * as notificationSettingsStore from '@/feature/alert/store/notificationSettings';
import {
  PushNotificationManager,
  getDeviceFormFactor,
  isNotificationUnsupported,
} from '@/feature/alert/lib';
import {
  useUpdateNotificationSetting,
  useNotificationSettings,
} from '@/feature/alert/hook';
import { SettingItem } from '@/feature/alert/component';
import { ERROR_CODE } from '@/feature/alert/constant';

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
  const { setModal } = useContext(ModalContext);

  const { data: notificationSettings } = useNotificationSettings();
  const updateSettings = useUpdateNotificationSetting();

  const [state, dispatch] = useReducer(
    notificationSettingsStore.reducer,
    notificationSettings
  );

  const { toast } = useToast();

  const setupNotifications = async () => {
    try {
      await PushNotificationManager.ensurePermission();

      const token = await PushNotificationManager.issueToken();
      const deviceType = getDeviceFormFactor();

      if (PushNotificationManager.isTokenChanged(token)) {
        await PushNotificationManager.syncWithServer(token, deviceType);
      }
    } catch (error) {
      throw error;
    }
  };

  const onToggle = async (type) => {
    const prev = state;
    const action = notificationSettingsStore.actions[type](!state[type]);
    const next = notificationSettingsStore.reducer(state, action);
    dispatch(action);

    try {
      await updateSettings.mutateAsync(next);
    } catch (error) {
      const rollbackAction = notificationSettingsStore.actions.hydrate(prev);
      dispatch(rollbackAction);
      toast(error.message);
    }
  };

  const isUnsupported = isNotificationUnsupported();

  return (
    <>
      <div className={style.alert}>
        <SettingItem
          title='알림 받기'
          content={content.alert}
          isEnabled={state.required}
          onToggle={async () => {
            if (state.required) {
              setModal({ id: 'disable-notification' });
              return;
            }

            try {
              await setupNotifications();
            } catch (error) {
              if (!(error instanceof AppError)) {
                return;
              }

              switch (error.code) {
                case ERROR_CODE.PERMISSION_JUST_DENIED: {
                  return;
                }

                default: {
                  toast(error.message);
                  return;
                }
              }
            }

            await onToggle('required');
          }}
          disabled={isUnsupported}
        />
        <SettingItem
          title='광고성 알림 받기'
          content={content.advertisement}
          isEnabled={state.marketing}
          onToggle={() => onToggle('marketing')}
          variant='blue'
          disabled={isUnsupported || !state.required}
          hasTerms
          to='/terms/marketing'
        />
      </div>

      <div className={style.line}></div>

      <div className={style.attendance}>
        <SettingItem
          title='출석체크 알림'
          content={content.attendance}
          isEnabled={state.attendance}
          onToggle={() => onToggle('attendance')}
          variant='blue'
          disabled={isUnsupported || !state.required}
        />
      </div>

      <NotificationSettingModalRenderer onToggle={onToggle} />
    </>
  );
}

function NotificationSettingModalRenderer({ onToggle }) {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <>
      {(() => {
        switch (modal.id) {
          case 'disable-notification':
            return (
              <ConfirmModal
                modalText={CONFIRM_MODAL_TEXT.DISABLE_NOTIFICATION}
                onConfirm={() => {
                  onToggle('required');
                  setModal({ id: null, type: null });
                }}
              />
            );

          default:
            return null;
        }
      })()}
    </>
  );
}
