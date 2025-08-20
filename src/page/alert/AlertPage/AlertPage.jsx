import { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  AppBar,
  FetchLoading,
  Icon,
  NewButton,
  ServerErrorFallback,
} from '@/shared/component';

import { useNotification } from '@/feature/alert/hook/notification';
import { CategoryTab, NotificationItem } from '@/feature/alert/component';
import { CATEGORY } from '@/feature/alert/constant';

import style from './AlertPage.module.css';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export default function AlertPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'ALL';

  const updateCategory = (category) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (category === 'ALL') {
        newParams.delete('category');
      } else {
        newParams.set('category', category);
      }

      return newParams;
    });
  };

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

      <div className={style.top}>
        <div className={style.notificationBar}>
          <Icon id='notice-bell' width={13} height={16} />
          <p>모든 알림은 14일 후 자동으로 삭제돼요!</p>
        </div>
      </div>

      <div className={style.categoryTabs}>
        {Object.entries(CATEGORY).map(([key, value]) => (
          <CategoryTab
            key={key}
            label={value}
            isSelected={key === activeCategory}
            onClick={() => updateCategory(key)}
          />
        ))}
      </div>

      <div className={style.readAllButton}>
        <NewButton variant='outlined' size='small' disabled>
          모두읽기
        </NewButton>
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={({ resetErrorBoundary }) => (
              <ServerErrorFallback reset={resetErrorBoundary} />
            )}
          >
            <Suspense fallback={<FetchLoading />}>
              <NotificationList category={activeCategory} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

function NotificationList({ category }) {
  const { data: notifications } = useNotification(category);

  if (notifications.length === 0) {
    return <div className={style.noNotification}>새로운 알림이 없어요</div>;
  }

  return (
    <div className={style.notificationList}>
      {notifications.map((item) => (
        <NotificationItem key={item.id} {...item} />
      ))}
    </div>
  );
}
