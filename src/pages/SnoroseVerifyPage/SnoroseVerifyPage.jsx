import { useState } from 'react';

import { TermsPage, VerifyPage, CompletePage } from '@/pages/SnoroseVerifyPage';

import { BackAppBar } from '@/shared/component';
import { Icon } from '@/shared/component';

import { TITLE_DES } from '@/constants';

import styles from './SnoroseVerifyPage.module.css';

export default function SnoroseVerifyPage() {
  const [step, setStep] = useState('terms');
  const { title, description } = TITLE_DES[step];

  return (
    <main className={styles.main}>
      <BackAppBar title='인증 신청' notFixed />
      {step === 'complete' ? (
        <Icon
          className={styles.check}
          id='check-thick'
          width={24}
          height={24}
        />
      ) : (
        <div className={styles.indicator}>
          <span
            className={`${styles.dot} ${step === 'terms' && styles.select}`}
          ></span>
          <span
            className={`${styles.dot} ${step === 'verify' && styles.select}`}
          ></span>
        </div>
      )}
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {step === 'terms' && <TermsPage setStep={setStep} />}
      {step === 'verify' && <VerifyPage setStep={setStep} />}
      {step === 'complete' && <CompletePage />}
    </main>
  );
}
