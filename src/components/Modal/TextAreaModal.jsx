import { useState } from 'react';

import { MODAL_OPTIONS } from '@/constants';

import styles from './Modal.module.css';

export default function TextAreaModal({ id, isOpen, setIsOpen }) {
  const [reportVal, setReportVal] = useState('');

  // report 500자 제한
  const handleReportValChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      setReportVal(newValue);
    }
  };

  const modalOption = MODAL_OPTIONS.find((option) => option.id === id);

  if (!isOpen || !modalOption) return null;

  return (
    <div className={styles.dim}>
      <div className={styles.container}>
        <div className={styles.noBottomLineTop}>
          <div
            className={styles.title}
            style={{ color: modalOption.titleColor }}
          >
            {modalOption.title}
          </div>
        </div>
        <div className={styles.textAreaCenter}>
          <textarea
            className={styles.textArea}
            value={reportVal}
            onChange={handleReportValChange}
          />
        </div>
        <div className={styles.bottom}>
          <div
            className={styles.leftCloseBtn}
            style={{ color: '#FF4B6C' }}
            onClick={() => setIsOpen(false)}
          >
            확인
          </div>
          <div className={styles.leftCloseBtn} onClick={() => setIsOpen(false)}>
            닫기
          </div>
        </div>
      </div>
    </div>
  );
}
