import { Portal } from '@/shared/component';

import styles from './DimModal.module.css';

export default function DimModal({ isOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal portalKey='modal'>
      <div className={styles.dim} onClick={(event) => event.stopPropagation()}>
        <div className={styles.container}>{children}</div>
      </div>
    </Portal>
  );
}
