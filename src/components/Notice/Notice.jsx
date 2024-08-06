import styles from './Notice.module.css';

const noticeTitle = '시험후기 등록 기간 공지';

export default function Notice() {
  return (
    <div className={styles.notice}>
      <span>[공지] {noticeTitle}</span>
    </div>
  );
}
