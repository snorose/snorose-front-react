import { Link } from 'react-router-dom';

import { PrimaryButton } from '@/shared/component';

import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.error}>404</h1>
      <div className={styles.text}>페이지를 찾을 수 없습니다.</div>
      <Link className={styles.button} to='/'>
        <PrimaryButton>메인으로</PrimaryButton>
      </Link>
    </main>
  );
}
