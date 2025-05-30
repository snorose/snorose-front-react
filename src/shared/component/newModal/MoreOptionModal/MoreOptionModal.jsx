import { Icon, Portal } from '@/shared/component';
import { useNavigate } from 'react-router-dom';
import styles from './MoreOptionModal.module.css';

export default function MoreOptionModal({
  modal,
  setModal,
  title,
  optionList,
}) {
  const navigate = useNavigate();

  if (!modal.id) {
    return null;
  }
  return (
    <Portal portalKey='modal'>
      <div
        className={styles.background}
        onClick={() => setModal({ id: null, reportType: null })}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.title}>{title}</h3>
          <ul className={styles.content}>
            {optionList.map((item, idx) => (
              <li
                key={idx}
                className={styles.contentItem}
                onClick={() => {
                  setModal({ id: item.modalId, reportType: null });
                  if (item.navUrl) {
                    navigate(item.navUrl);
                  }
                }}
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
