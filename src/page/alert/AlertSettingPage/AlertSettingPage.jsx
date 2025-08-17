import { useReducer } from 'react';

import { BackAppBar } from '@/shared/component';

import { alertSettingReducer } from '@/feature/alert/reducer';
import { SettingItem } from '@/feature/alert/component';

import style from './AlertSettingPage.module.css';

const content = {
  alert: `푸시 메시지와 알림함으로 소식을 전해드려요\n* OFF로 변경 시, 푸시&알림함 모두 꺼집니다`,
  advertisement: `광고성 알림을 받으려면\n먼저 ‘알림 받기’가 켜져 있어야 해요`,
  attendance: `매일 오후 10시에 출석 체크를 잊지 않도록\n알림으로 알려드려요`,
};

const initialState = {
  alert: false,
  advertisement: false,
  attendance: false,
};

export default function AlertSettingPage() {
  const [alertSettings, dispatch] = useReducer(
    alertSettingReducer,
    initialState
  );

  return (
    <div>
      <BackAppBar title='알림 설정' />

      <div className={style.alert}>
        <SettingItem
          title='알림 받기'
          content={content.alert}
          isEnabled={alertSettings.alert}
          onToggle={() => dispatch({ type: 'TOGGLE_ALERT' })}
        />
        <SettingItem
          title='광고성 알림 받기'
          content={content.advertisement}
          isEnabled={alertSettings.advertisement}
          onToggle={() => dispatch({ type: 'TOGGLE_ADVERTISEMENT' })}
          variant='blue'
          disabled={!alertSettings.alert}
        />
      </div>

      <div className={style.line}></div>

      <div className={style.attendance}>
        <SettingItem
          title='출석체크 알림'
          content={content.attendance}
          isEnabled={alertSettings.attendance}
          onToggle={() => dispatch({ type: 'TOGGLE_ATTENDANCE' })}
          variant='blue'
          disabled={!alertSettings.alert}
        />
      </div>
    </div>
  );
}
