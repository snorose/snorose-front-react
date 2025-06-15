import { DimModalLayout } from '@/shared/component';
import styles from './NewConfirmModal.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

export default function NewConfirmModal({ modalText, onConfirm }) {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <DimModalLayout isOpen={modal?.id}>
      <div className={styles.top}>
        <h3 className={styles.title}>{modalText.title}</h3>
        {modalText.description && (
          <p className={styles.description}>{modalText.description}</p>
        )}
      </div>
      <div className={styles.bottom}>
        <button
          className={styles.bottomButton}
          onClick={() => {
            setModal({ id: null, type: null });
          }}
        >
          {modalText.cancelText}
        </button>
        <div className={styles.buttonDivider} />
        <button
          className={styles.bottomButton}
          onClick={() => {
            onConfirm();
          }}
        >
          {modalText.confirmText}
        </button>
      </div>
    </DimModalLayout>
  );
}
