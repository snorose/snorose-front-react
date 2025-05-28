import { DimModal, Icon } from '@/shared/component';
import { REPORT_COMMENT_REASON_LIST } from '../../constant/reportCommentReasonList';
import { REPORT_POST_REASON_LIST } from '../../constant/reportPostReasonList';
import { REPORT_USER_REASON_LIST } from '../../constant/reportUserReasonList';
import styles from './ReportTypesModal.module.css';

export default function ReportTypesModal({ modal, setModal }) {
  console.log(modal);
  const getReportData = () => {
    switch (modal.id) {
      case 'report-post':
        return { list: REPORT_POST_REASON_LIST, label: '게시글' };
      case 'report-user':
        return { list: REPORT_USER_REASON_LIST, label: '이용자' };
      case 'report-comment':
        return { list: REPORT_COMMENT_REASON_LIST, label: '댓글' };
      default:
        return { list: [], label: '' };
    }
  };

  return (
    <DimModal isOpen={modal.id}>
      <h3 className={styles.title}>{getReportData().label} 신고</h3>
      <ul className={styles.content}>
        {getReportData().list.map(
          ({ reportType, iconId, label, width, height }) => (
            <li
              key={reportType}
              className={styles.contentItem}
              onClick={() =>
                setModal({
                  id: 'confirm-report',
                  reportType: reportType,
                })
              }
            >
              <p>{label}</p>
              <Icon
                id={iconId}
                className={styles.itemIcon}
                width={width}
                height={height}
              />
            </li>
          )
        )}
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
