import styles from './ConfirmModal.module.css';
import { Portal } from '@/components';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal portalKey='modal'>
      <div className={styles.dim}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          {!!message && <p className={styles.deleteCenter}>{message}</p>}
          <div className={styles.buttonGroup}>
            {secondaryButtonText !== undefined &&
              onSecondaryButtonClick !== undefined && (
                <button
                  type='button'
                  className={styles.secondaryButton}
                  onClick={onSecondaryButtonClick}
                >
                  {secondaryButtonText}
                </button>
              )}
            {primaryButtonText !== undefined &&
              onPrimaryButtonClick !== undefined && (
                <button
                  type='button'
                  className={styles.primaryButton}
                  onClick={onPrimaryButtonClick}
                >
                  {primaryButtonText}
                </button>
              )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
