import { Options } from '@/components/Modal';

import { MODAL_OPTIONS } from '@/constants';

import styles from './Modal.module.css';

export default function OptionModal({
  id,
  isOpen,
  setIsOpen,
  closeFn,
  functions,
  onOptionClick,
}) {
  const modalOption = MODAL_OPTIONS.find((option) => option.id === id);

  if (!isOpen || !modalOption) return null;

  return (
    <div className={styles.dim}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div
            className={styles.title}
            style={{ color: modalOption.titleColor }}
          >
            {modalOption.title}
          </div>
        </div>
        <div className={styles.center}>
          <Options
            options={modalOption.children}
            functions={functions}
            onOptionClick={onOptionClick}
          />
        </div>
        <div className={styles.bottom}>
          <div
            className={styles.leftCloseBtn}
            onClick={() => {
              closeFn();
              setIsOpen(false);
            }}
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  );
}
