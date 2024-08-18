import styles from './DeleteAccountPage.module.css';
import { Link } from 'react-router-dom';
import { CloseAppBar } from '../../../components/AppBar';

import { useState } from 'react';
import { useAuth } from '@/hooks';

const descriptions = [
  '• 회원탈퇴 시 모든 정보가 영구적으로 삭제되며, 다시는 복구할 수 없습니다.',
  '• 보유 포인트 및 포인트 기록은 복구가 불가능합니다.',
];

export default function DeleteAccountPage() {
  const { withdraw } = useAuth();
  const [password, setPassword] = useState('');

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteAccountButtonClick = () => {
    const confirmation = window.confirm('정말로 탈퇴하시겠습니까?');

    if (confirmation) {
      withdraw(password);
    }
  };

  return (
    <main className={styles.deleteAccountPage}>
      <CloseAppBar alignRight={true} stroke='#000' />

      <section className={styles.contentContainer}>
        <div className={styles.titleDescWrapper}>
          <h1 className={styles.title}>탈퇴 시 아래 내용을 확인해주세요</h1>
          <div className={styles.descWrapper}>
            {descriptions.map((desc, index) => (
              <p key={index} className={styles.desc}>
                {desc}
              </p>
            ))}
          </div>

          <input
            type='password'
            value={password}
            onChange={handlePasswordInputChange}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Link to='/my-page?tab=policy' className={styles.goBackButton}>
            뒤로가기
          </Link>
          <button
            className={styles.deleteAccountButton}
            onClick={handleDeleteAccountButtonClick}
          >
            탈퇴하기
          </button>
        </div>
      </section>
    </main>
  );
}
