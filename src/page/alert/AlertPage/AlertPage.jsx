import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Icon, NewButton } from '@/shared/component';

import { toNotificationItem } from '@/feature/alert/mapper/notification';
import { CategoryTab, NotificationItem } from '@/feature/alert/component';
import { CATEGORY } from '@/feature/alert/constant';

import { initialAlertData } from '@/dummy/data/alert';

import style from './AlertPage.module.css';

export default function AlertPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(initialAlertData);
  const [selected, setSelected] = useState('ALL');

  const handleCategoryChange = (category) => setSelected(category);

  const mappedAlerts = alerts.map(toNotificationItem);

  return (
    <div className={style.container}>
      <AppBar title='알림'>
        <Icon
          className={style.settingIcon}
          id='setting'
          width='24'
          height='24'
          onClick={() => navigate('/alert/setting')}
        />
      </AppBar>

      <div className={style.categoryTabs}>
        {Object.entries(CATEGORY).map(([key, value]) => (
          <CategoryTab
            key={key}
            label={value}
            isSelected={key === selected}
            onClick={() => handleCategoryChange(key)}
          />
        ))}
      </div>

      <div className={style.readAllButton}>
        <NewButton variant='outlined' size='small' disabled>
          모두읽기
        </NewButton>
      </div>

      <div className={style.notificationList}>
        {mappedAlerts.map((item) => (
          <NotificationItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
