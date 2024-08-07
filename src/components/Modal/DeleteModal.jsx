import styles from './Modal.module.css';
import { MODAL_OPTIONS } from '../../constants/modalOptions';

export default function DeleteModal({ id, isOpen, setIsOpen }) {
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
        <div className={styles.deleteCenter}>{modalOption.children.text}</div>
        <div className={styles.deleteOrBack}>
          <div className={styles.redBtn}>{modalOption.bottom.redBtn}</div>
          <div className={styles.greyBtn} onClick={() => setIsOpen(false)}>
            {modalOption.bottom.greyBtn}
          </div>
        </div>
      </div>
    </div>
  );
}
