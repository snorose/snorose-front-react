import { MODAL_OPTIONS } from '@/shared/constant';

import styles from './ChoiceModal.module.css';

export default function ChoiceModal({ id, isOpen, closeFn, optionFns }) {
  const modalOption = MODAL_OPTIONS.find((option) => option.id === id);

  if (!isOpen || !modalOption) return null;

  return (
    <div className={styles.dim} onClick={() => closeFn()}>
      <div
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.choiceTitle}>
          <div
            className={styles.title}
            style={{ color: modalOption.titleColor }}
          >
            {modalOption.title}
          </div>
        </div>
        {modalOption.children.map((option, index) => (
          <div
            onClick={() => {
              optionFns[index]();
            }}
            className={styles.choiceOptions}
            style={{ color: option.color }}
            key={index}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
}
