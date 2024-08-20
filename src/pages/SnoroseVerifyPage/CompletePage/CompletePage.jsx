import { Link } from 'react-router-dom';

import { Button } from '@/pages/SnoroseVerifyPage';

import Complete from '@/assets/images/completeVerification.svg';

import styles from './CompletePage.module.css';

export default function CompletePage() {
  return (
    <section className={styles.content}>
      <div className={styles.illust}>
        <img src={Complete} alt='인증 신청 완료' />
      </div>
      <Link to='/'>
        <Button>메인 페이지로</Button>
      </Link>
    </section>
  );
}
