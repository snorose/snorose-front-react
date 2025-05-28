import { Icon, Portal } from '@/shared/component';
import { useNavigate } from 'react-router-dom';
import styles from './MyPostMoreOptionsModal.module.css';

export default function PostMoreOptionsModal({ modal, setModal }) {
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
          <h3 className={styles.title}>게시글</h3>
          <ul className={styles.content}>
            <li
              className={styles.contentItem}
              onClick={() => {
                setModal({ id: null, reportType: null });
                navigate(`./edit`);
              }}
            >
              <p>수정하기</p>
              <Icon
                id='pencil'
                className={styles.itemIcon}
                width={19}
                height={22}
                fill='#898989'
              />
            </li>
            <li
              className={styles.contentItem}
              onClick={() =>
                setModal({
                  id: 'confirm-post-delete',
                  reportType: null,
                })
              }
            >
              <p>삭제하기</p>
              <Icon
                id='trash'
                className={styles.itemIcon}
                width={16}
                height={20}
              />
            </li>
          </ul>
        </div>
      </div>
    </Portal>
  );
}
