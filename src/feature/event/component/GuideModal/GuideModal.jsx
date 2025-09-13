import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GuideModal.module.css';
import {
  noParticipationIllustration,
  noSellIllustration,
  noTransferIllustration,
} from '@/assets/illustrations';

export default function GuideModal({ onConfirm, onClose }) {
  const [step, setStep] = useState(0);
  const guideSteps = [
    {
      title: '무단 불참 절대 금지!',
      content: (
        <>
          무단 불참 시 경고 1회가 부여되며,
          <br />
          향후 모든 이벤트에 참여가 불가해요
        </>
      ),
      image: noParticipationIllustration,
    },
    {
      title: '양도, 대리수령 절대 금지!',
      content: (
        <>
          양도,대리수령 적발 시 2년 강등되며,
          <br />
          향후 모든 이벤트에 참여가 불가해요
        </>
      ),
      image: noTransferIllustration,
    },
    {
      title: '입장권 금전 거래 절대 금지!',
      content: (
        <>
          입장권 금전 거래 적발 시,
          <br />
          영구 강등 처리돼요
        </>
      ),
      image: noSellIllustration,
    },
  ];
  const isLast = step === guideSteps.length - 1;
  const navigate = useNavigate();

  const handleNext = () => {
    if (isLast) {
      onConfirm();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const goEventNotice = () => {
    navigate('/board/event/notice');
  };

  return (
    <div className={styles.box}>
      <div className={styles.modal}>
        <div className={styles.modalTop}>
          <button className={styles.close} onClick={onClose}>
            닫기
          </button>
        </div>
        <div className={styles.illustration}>
          <img
            src={guideSteps[step].image}
            alt='illustration'
            className={styles.image}
          />
        </div>

        <h2>{guideSteps[step].title}</h2>
        <p className={styles.content}>{guideSteps[step].content}</p>

        <div className={styles.stepIndicator}>
          {guideSteps.map((_, idx) => (
            <span
              key={idx}
              className={idx === step ? styles.activeDot : styles.dot}
            ></span>
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.goNotice} onClick={goEventNotice}>
            공지 보기
          </button>
          <button className={styles.confirm} onClick={handleNext}>
            {isLast ? '신청하기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
