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
          {list.map(({ id, text }) => (
            <li key={id} className={styles.item}>
              {text}
            </li>
          ))}
          <br />
          {endTerms}
        </pre>
      </div>
      <PrimaryButton onClick={() => setStep('verify')}>동의</PrimaryButton>
    </section>
  );
}
