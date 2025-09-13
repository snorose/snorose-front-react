import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/shared/component';
import { ModalContext } from '@/shared/context/ModalContext';
import { useCommentContext } from '@/feature/comment/context';
import styles from './MoreOptionModal.module.css';

export default function MoreOptionModal({ modalContent, optionActions, top }) {
  const { setModal } = useContext(ModalContext);
  const { resetCommentState } = useCommentContext();

  if (modalContent.options.length === 0) {
    setModal({ id: null, type: null });
  }

  // 옵션을 누르면, 그 옵션 id가 일치하는 함수를 실행 (없으면 모달 닫기 함수 리턴)
  const handleOptionClick = (item) => {
    if (!optionActions?.[item.id]) {
      setModal({ id: null, type: null });
    } else {
      optionActions?.[item.id]?.();
    }
  };

  const handleOutsideClick = () => {
    setModal({ id: null, type: null });
    resetCommentState();
  };

  return createPortal(
    <div className={styles.background} onClick={handleOutsideClick}>
      <div
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
        style={{ top: top !== undefined ? `${top + 30}px` : '9rem' }}
      >
        <h3 className={styles.title}>{modalContent.title}</h3>
        <ul className={styles.content}>
          {modalContent.options.map((option, idx) => (
            <li
              key={idx}
              className={`${styles.contentItem} ${idx === modalContent.length - 1 ? styles.lastItem : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              <p>{option.label}</p>
              {option.iconId && (
                <Icon
                  id={option.iconId}
                  className={styles.itemIcon}
                  width={option.width}
                  height={option.height}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById('modal')
  );
}
