import { createPortal } from 'react-dom';
import styles from './DimModal.module.css';

export default function DimModal({ isOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.dim} onClick={(event) => event.stopPropagation()}>
      <div className={styles.container}>{children}</div>
    </div>,
    document.getElementById('modal')
  );
}
