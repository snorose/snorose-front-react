import { DimModalLayout, Icon } from '@/shared/component';
import styles from './IconOptionModal.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

export default function IconOptionModal({ modalContent, optionActions }) {
  const { modal, setModal } = useContext(ModalContext);

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

  return (
    <DimModalLayout isOpen={modal.id}>
      <h3 className={styles.title}>{modalContent.title}</h3>
      <ul className={styles.content}>
        {modalContent.options.map((option) => (
          <li
            key={option.id}
            className={styles.contentItem}
            onClick={() => {
              handleOptionClick(option);
            }}
          >
            <p>{option.text}</p>
            <Icon
              id={option.iconId}
              className={styles.itemIcon}
              width={option.width}
              height={option.height}
            />
          </li>
        ))}
      </ul>
      <button
        className={styles.bottomButton}
        onClick={() => setModal({ id: null, type: null })}
      >
        닫기
      </button>
    </DimModalLayout>
  );
}
