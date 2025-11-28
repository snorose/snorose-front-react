import { useRouteError, useNavigate } from 'react-router-dom';

import { NewButton } from '@/shared/component';

import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>앗! 문제가 발생했어요.</h2>
      {isDev && (
        <p className={styles.message}>
          {error.message ?? '알 수 없는 오류가 발생했습니다.'}
        </p>
      )}

      <div className={styles.button}>
        <NewButton onClick={() => navigate('/')}>홈으로 돌아가기</NewButton>
      </div>
    </div>
  );
}
