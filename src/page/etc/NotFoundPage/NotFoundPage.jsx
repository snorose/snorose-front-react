import { Link } from 'react-router-dom';

import { PrimaryButton } from '@/shared/component';

import notFoundIllustration from '@/assets/illustrations/notFoundIllustration.svg';

import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <div className={styles.illustrationWrapper}>
        <img
          src={notFoundIllustration}
          alt='404일러스트'
          className={styles.illustration}
        />
        <p className={styles.text}>페이지를 찾을 수 없습니다.</p>
      </div>

      <Link className={styles.button} to='/'>
        <PrimaryButton>메인으로</PrimaryButton>
      </Link>
    </main>
  );
}
