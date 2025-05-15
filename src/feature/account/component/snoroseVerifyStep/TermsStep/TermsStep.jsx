import { PrimaryButton } from '@/shared/component';

import { TERMS } from '@/feature/account/constant';

import styles from './TermsStep.module.css';

export default function TermsStep({ setStep }) {
  const { text, list } = TERMS;
  const [startTerms, endTerms] = text;

  return (
    <section className={styles.content}>
      <div className={styles.terms}>
        <pre className={styles.text}>
          {startTerms}

          <ul className={styles.list}>
            {list.map(({ id, text }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>

          {endTerms}
        </pre>
      </div>

      <PrimaryButton
        className={styles.button}
        onClick={() => setStep('verify')}
      >
        동의
      </PrimaryButton>
    </section>
  );
}
