import { createPortal } from 'react-dom';

import style from './ConfirmModal.module.css';

export default function ConfirmModal({
  title,
  description,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
}) {
  const modalRoot = document.getElementById('modal');

  return createPortal(
    <div className={style.dim}>
      <div className={style.container}>
        <div className={style.title}>{title}</div>
        {description ? (
          <div className={style.description}>{description}</div>
        ) : null}

        <div className={style.buttonGroup}>
          <button className={style.secondaryButton} onClick={onSecondary}>
            {secondaryText}
          </button>
          <button className={style.primaryButton} onClick={onPrimary}>
            {primaryText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
