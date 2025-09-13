import { DimModalLayout } from '@/shared/component';
import styles from './TextOptionModal.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

export default function TextOptionModal({ modalContent, optionActions }) {
  const { modal, setModal } = useContext(ModalContext);

  if (modalContent.options.length === 0) {
    setModal({ id: null, type: null });
  }

  // 들어온 옵션 개수에 따라 타입 결정 (single: 블루 계열 ui, multiple: 회색 계열 ui)
  const type = modalContent.options.length === 1 ? 'single' : 'multiple';

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
      <div className={styles.top}>
        <h3
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: modalContent.title }}
        />
        {modalContent.description && (
          <p className={styles.description}>{modalContent.description}</p>
        )}
      </div>
      <div className={styles.content}>
        {modalContent.options.map((option, idx) => (
          <button
            key={idx}
            className={`${styles.contentItem} ${idx === modalContent.options.length - 1 && styles.lastItem} ${type === 'single' ? styles.singleType : styles.multipleType}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </DimModalLayout>
  );
}
