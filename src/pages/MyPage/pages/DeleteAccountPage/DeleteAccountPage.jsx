import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth, useModal } from '@/hooks';

import { CloseAppBar, ConfirmModal, InputPassword } from '@/components';

import styles from './DeleteAccountPage.module.css';

const DESCRIPTION_LIST = [
  '• 회원탈퇴 시 모든 정보가 영구적으로 삭제되며, 다시는 복구할 수 없습니다.',
  '• 보유 포인트 및 포인트 기록은 복구가 불가능합니다.',
  '• 비밀번호를 입력해야 탈퇴가 가능해요',
];

export default function DeleteAccountPage() {
  const [password, setPassword] = useState('');

  const { withdraw } = useAuth();
  const withdrawConfirmModal = useModal();

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleModalPrimaryButtonClick = () => {
    withdraw(password, {
      onError: withdrawConfirmModal.closeModal,
    });
  };

  return (
    <main className={styles.deleteAccountPage}>
      <CloseAppBar alignRight={true} stroke='#000' notFixed />

      <section className={styles.contentContainer}>
        <div className={styles.titleDescWrapper}>
          <h1 className={styles.title}>탈퇴 시 아래 내용을 확인해주세요</h1>
          <div className={styles.descWrapper}>
            {DESCRIPTION_LIST.map((desc, index) => (
              <p key={index} className={styles.desc}>
                {desc}
              </p>
            ))}
          </div>

          <InputPassword
            title='비밀번호'
            placeholder='비밀번호를 입력하세요'
            value={password}
            onChange={handlePasswordInputChange}
            isStatic
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Link to='/my-page?tab=policy' className={styles.goBackButton}>
            뒤로가기
          </Link>
          <button
            disabled={password === ''}
            className={styles.deleteAccountButton}
            onClick={withdrawConfirmModal.openModal}
          >
            탈퇴하기
          </button>
        </div>
      </section>

      <ConfirmModal
        isOpen={withdrawConfirmModal.isOpen}
        title='정말로 탈퇴하시겠습니까?'
        primaryButtonText='확인'
        secondaryButtonText='취소'
        onPrimaryButtonClick={handleModalPrimaryButtonClick}
        onSecondaryButtonClick={withdrawConfirmModal.closeModal}
      />
    </main>
  );
}
