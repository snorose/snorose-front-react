import { Button } from '@/pages/SnoroseVerifyPage';

import { TERMS } from '@/constants';

import styles from './TermsPage.module.css';

export default function TermsPage({ setStep }) {
  return (
    <section className={styles.content}>
      <div className={styles.terms}>
        <pre className={styles.text}>{TERMS}</pre>
      </div>
      <Button onClick={() => setStep('verify')}>동의</Button>
    </section>
  );
}
