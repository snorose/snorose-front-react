import { TERMS } from '../../../constants';

import styles from './TermsPage.module.css';

export default function TermsPage({ setStep }) {
  return (
    <div className={styles.content}>
      <div className={styles.terms}>
        <pre className={styles.text}>{TERMS}</pre>
      </div>
      <button className={styles.button} onClick={() => setStep('verify')}>
        동의
      </button>
    </div>
  );
}
