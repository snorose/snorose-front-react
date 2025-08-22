import { DimModalLayout } from '@/shared/component';
import styles from './NewConfirmModal.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

export default function NewConfirmModal({ modalText, onConfirm, onCancel }) {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <DimModalLayout isOpen={modal?.id}>
      <div className={styles.top}>
        <h3
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: modalText.title }}
        />
        {modalText.description && (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: modalText.description }}
          />
        )}
      </div>
      <div className={styles.bottom}>
        <button
          className={styles.bottomButton}
          onClick={() => {
            onCancel();
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
