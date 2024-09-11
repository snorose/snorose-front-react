import { Button } from '@/pages/SnoroseVerifyPage';

import { TERMS } from '../../../constants';

import styles from './TermsPage.module.css';

export default function TermsPage({ setStep }) {
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
      <Button onClick={() => setStep('verify')}>동의</Button>
    </section>
  );
}
