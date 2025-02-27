import { Icon } from '@/shared/component';
import { MODAL_OPTIONS } from '@/constants';

import styles from '@/shared/component/modal/Modal.module.css';

export default function OptionModal({
  id,
  isOpen,
  setIsOpen,
  closeFn,
  functions,
  onOptionClick,
}) {
  const modalOption = MODAL_OPTIONS.find((option) => option.id === id);

  if (!isOpen || !modalOption) return null;

  return (
    <div className={styles.dim} onClick={(event) => event.stopPropagation()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div
            className={styles.title}
            style={{ color: modalOption.titleColor }}
          >
            {modalOption.title}
          </div>
        </div>
        <div className={styles.center}>
          <Options
            options={modalOption.children}
            functions={functions}
            onOptionClick={onOptionClick}
          />
        </div>
        <div className={styles.bottom}>
          <div
            className={styles.leftCloseBtn}
            onClick={() => {
              closeFn();
              setIsOpen(false);
            }}
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  );
}

function Options({ options, functions, onOptionClick }) {
  const handleClick = (iconId) => {
    if (iconId && functions !== undefined && functions[iconId]) {
      functions[iconId]();
    }
  };

  return (
    <div className={styles.options}>
      {options.map((option) => (
        <div
          className={styles.optionBar}
          key={option.iconId}
          data-value={option.value}
          onClick={(event) => {
            event.stopPropagation();
            handleClick(option.iconId);

            if (onOptionClick !== undefined) {
              onOptionClick(event);
            }
          }}
        >
          <div className={styles.iconBox}>
            <Icon
              id={option.iconId}
              width={option.IconWidth}
              height={option.IconHeight}
            />
          </div>
          <div
            className={styles.optionText}
            style={{ color: option.color || 'inherit' }}
          >
            {option.text}
          </div>
        </div>
      ))}
    </div>
  );
}
