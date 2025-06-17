import { Link } from 'react-router-dom';

import { PrimaryButton } from '@/shared/component';

import Complete from '@/assets/illustrations/taskCompleteIllustration.svg';

import styles from './CompleteStep.module.css';

export default function CompleteStep() {
  return (
    <section className={styles.content}>
      <div className={styles.illustration}>
        <img src={Complete} alt='인증 신청 완료' />
      </div>

      <Link to='/'>
        <PrimaryButton className={styles.button}>메인 페이지로</PrimaryButton>
      </Link>
    </section>
  );
}
