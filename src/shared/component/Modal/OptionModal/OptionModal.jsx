import { DimModalLayout, Icon } from '@/shared/component';
import styles from './OptionModal.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useContext } from 'react';
import { getReportModalId } from '@/feature/report/lib/getReportModalId';

export default function OptionModal({ title, optionList }) {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <DimModalLayout isOpen={modal.id}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.content}>
        {optionList.map((option, idx) => (
          <li
            key={idx}
            className={styles.contentItem}
            onClick={() => {
              setModal({
                id: getReportModalId(title),
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
    </DimModalLayout>
  );
}
