import { createPortal } from 'react-dom';
import styles from './DimModalLayout.module.css';

export default function DimModalLayout({ children }) {
  return createPortal(
    <div className={styles.dim} onClick={(event) => event.stopPropagation()}>
      <div className={styles.layout}>{children}</div>
    </div>,
    document.getElementById('modal')
  );
}
