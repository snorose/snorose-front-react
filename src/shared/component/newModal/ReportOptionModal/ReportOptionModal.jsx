import { DimModal, Icon } from '@/shared/component';
import styles from './ReportOptionModal.module.css';

export default function ReportOptionModal({
  modal,
  setModal,
  title,
  optionList,
}) {
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
                id: 'confirm-report',
                reportType: option.reportType,
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
        onClick={() => setModal({ id: null, reportType: null })}
      >
        닫기
      </button>
    </DimModal>
  );
}
