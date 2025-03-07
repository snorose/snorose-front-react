import { Link } from 'react-router-dom';

import { PrimaryButton } from '@/shared/component';

import Complete from '@/assets/images/completeVerification.svg';

import styles from './CompleteStep.module.css';

export default function CompleteStep() {
  return (
    <section className={styles.content}>
      <div className={styles.illust}>
        <img src={Complete} alt='인증 신청 완료' />
      </div>
      <Link to='/'>
        <PrimaryButton>메인 페이지로</PrimaryButton>
      </Link>
    </section>
  );
}
