import { BackAppBar, PrimaryButton } from '@/shared/component';
import styles from './CheckPrivacyTermPage.module.css';
import { PRIVACY_TERM } from '@/feature/account/constant/privacyTerm';

export default function CheckPrivacyTermPage() {
  return (
    <main className={styles.main}>
      <BackAppBar notFixed />
      <div className={styles.title}>
        {PRIVACY_TERM.title}
        <div className={styles.required} />
      </div>
      <div className={styles.description}>
        <div className={styles.summary}>{PRIVACY_TERM.summary}</div>
        <div className={styles.details}></div>
      </div>
      <PrimaryButton>동의하고 계속하기</PrimaryButton>
    </main>
  );
}
