import { DimModal } from '@/shared/component';
import styles from './NewConfirmModal.module.css';

export default function NewConfirmModal({
  modal,
  setModal,
  modalText,
  onClickHandler,
}) {
  return (
    <DimModal isOpen={modal.id}>
      <div className={styles.top}>
        <h3 className={styles.title}>{modalText.title}</h3>
        {modalText.description && (
          <p className={styles.description}>{modalText.description}</p>
        )}
        {/* {currentBoard.id !== 23 && (
          <p className={styles.description}>삭제 시 포인트가 차감돼요</p>
        )} */}
      </div>

      <div className={styles.bottom}>
        <button
          className={styles.bottomButton}
          onClick={() => {
            setModal({ id: null, reportType: null });
          }}
        >
          {modalText.cancelText}
        </button>
        <div className={styles.buttonDivider} />
        <button
          className={styles.bottomButton}
          onClick={() => {
            onClickHandler();
          }}
        >
          {modalText.confirmText}
        </button>
      </div>
    </DimModal>
  );
}
