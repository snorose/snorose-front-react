import { DimModal, Icon } from '@/shared/component';
import styles from './OptionModal.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';

export default function OptionModal({ title, optionList }) {
  const { modal, setModal } = useContext(ModalContext);
  const getModalId = () => {
    if (title === '게시글 신고') return 'confirm-post-report';
    if (title === '이용자 신고') return 'confirm-user-report';
    if (title === '댓글 신고') return 'confirm-comment-report';
    return null;
  };

  return (
    <DimModal isOpen={modal.id}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.content}>
        {optionList.map((option, idx) => (
          <li
            key={idx}
            className={styles.contentItem}
            onClick={() => {
              setModal({
                id: getModalId(),
                type: option.type,
              });
            }}
          >
            <p>{option.label}</p>
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
    </DimModal>
  );
}
