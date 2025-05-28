import { Icon, Portal } from '@/shared/component';
import styles from './PostMoreOptionsModal.module.css';

export default function PostMoreOptionsModal({ modal, setModal }) {
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
              onClick={() => setModal({ id: 'report-post-types', reportType: null })}
            >
              <p>게시글 신고하기</p>
              <Icon
                id='report-post'
                className={styles.itemIcon}
                width={19}
                height={22}
              />
            </li>
            <li
              className={styles.contentItem}
              onClick={() => setModal({ id: 'report-user-types', reportType: null })}
            >
              <p>이용자 신고하기</p>
              <Icon
                id='report-user'
                className={styles.itemIcon}
                width={17}
                height={17}
              />
            </li>
          </ul>
        </div>
      </div>
    </Portal>
  );
}
