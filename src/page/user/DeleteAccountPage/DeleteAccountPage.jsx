import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth, useModal } from '@/shared/hook';
import { CloseAppBar, ConfirmModal, PwInput, Icon } from '@/shared/component';

import styles from './DeleteAccountPage.module.css';

const DESCRIPTION_LIST = [
  '아이디, 이메일, 이름, 학번은 민원 처리 및 분쟁 조정 목적으로 보관돼요',
  '보유 포인트 및 포인트 기록은 복구가 불가능해요',
  '포인트가 음수인 경우, 재가입 후 인증하면 탈퇴 전 포인트로 설정돼요',
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
      <CloseAppBar alignRight={true} notFixed />

      <section className={styles.contentContainer}>
        <div className={styles.titleDescWrapper}>
          <h1 className={styles.title}>탈퇴 시 아래 내용을 확인해주세요</h1>
          <div className={styles.descriptionWrapper}>
            {DESCRIPTION_LIST.map((desc, index) => (
              <div className={styles.dotDescriptionList}>
                <Icon
                  className={styles.middleDot}
                  id='middle-dot'
                  width={6}
                  height={6}
                />
                <p key={index} className={styles.description}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <PwInput
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
