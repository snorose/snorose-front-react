import styles from './Modal.module.css';
import { MODAL_OPTIONS } from '../../constants/modalOptions';
import Options from './Options';

export default function OptionModal({ id, isOpen, setIsOpen }) {
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
          <Options options={modalOption.children} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.leftCloseBtn} onClick={() => setIsOpen(false)}>
            닫기
          </div>
        </div>
      </div>
    </div>
  );
}
