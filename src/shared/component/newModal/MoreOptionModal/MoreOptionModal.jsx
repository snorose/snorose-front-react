import { useContext } from 'react';
import { Icon, Portal } from '@/shared/component';
import { ModalContext } from '@/shared/context/ModalContext';
import styles from './MoreOptionModal.module.css';

export default function MoreOptionModal({ title, optionList, functions }) {
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

  return (
    <Portal portalKey='modal'>
      <div
        className={styles.background}
        onClick={() => setModal({ id: null, type: null })}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
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
      </div>
    </Portal>
  );
}
