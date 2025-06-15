import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/shared/component';
import { ModalContext } from '@/shared/context/ModalContext';
import styles from './MoreOptionModal.module.css';

export default function MoreOptionModal({ title, optionList, functions, top }) {
  const { modal, setModal } = useContext(ModalContext);

  if (!modal.id) {
    return null;
  }

  const handleOptionClick = (item, idx) => {
    if (item.modalId) {
      setModal({ id: item.modalId, type: null });
    }

    if (functions?.[idx] && typeof functions[idx] === 'function') {
      functions[idx]();
    }
  };

  return createPortal(
    <div
      className={styles.background}
      onClick={() => setModal({ id: null, type: null })}
    >
      <div
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
        style={{ top: top !== undefined ? `${top + 30}px` : '9rem' }}
          >
        <h3 className={styles.title}>{title}</h3>
        <ul className={styles.content}>
          {optionList.map((item, idx) => (
            <li
              key={idx}
              className={styles.contentItem}
              onClick={() => handleOptionClick(item, idx)}
            >
              <p>{item.label}</p>
              <Icon
                id={item.iconId}
                className={styles.itemIcon}
                width={item.width}
                height={item.height}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById('modal')
  );
}
