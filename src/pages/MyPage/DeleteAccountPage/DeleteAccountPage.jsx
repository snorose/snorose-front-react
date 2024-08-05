import { Link } from 'react-router-dom';

import { Icon } from '../../../components/Icon';

import styles from './DeleteAccountPage.module.css';

const descriptions = [
  '• 아이디, 이메일, 학번은 .. 목적으로 6개월간 보관됩니다',
  '• 보유 포인트 및 포인트 기록은 복구가 불가능합니다',
  '• 등등..',
];

export default function DeleteAccountPage() {
  return (
    <main className={styles.deleteAccountPage}>
      <div className={styles.closeIconWrapper}>
        <Link to='/my-page' className={styles.closeIcon}>
          <Icon id='x' />
        </Link>
      </div>
      <div className={styles.titleDescWrapper}>
        <h1 className={styles.title}>탈퇴 시 아래 내용을 확인해주세요</h1>
        <div className={styles.descWrapper}>
          {descriptions.map((desc, index) => (
            <p key={index} className={styles.desc}>
              {desc}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Link to='/my-page' className={styles.goBackButton}>
          뒤로가기
        </Link>
        <button className={styles.deleteAccountButton}>탈퇴하기</button>
      </div>
    </main>
  );
}
