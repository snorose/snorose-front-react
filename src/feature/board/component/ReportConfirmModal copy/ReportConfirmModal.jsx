import { DimModal } from '@/shared/component';
import {
  useReportPostMutation,
  useReportUserMutation,
} from '../../hook/useReportPostUser';
import { reportType } from '../../lib/parseReportType';
import styles from './ReportConfirmModal.module.css';

export default function ReportConfirmModal({ modal, setModal, data }) {
  const { mutate: reportPostMutate } = useReportPostMutation();
  const { mutate: reportUserMutate } = useReportUserMutation();

  const parsedReportType = reportType(modal.reportType);

  // 게시글 신고
  const handlePostReport = () => {
    if (!modal.reportType) return;

    reportPostMutate({
      reportType: modal.reportType,
    });
  };

  // 유저 신고
  const handleUserReport = () => {
    if (!modal.reportType || !data?.userId) return;

    reportUserMutate({
      encryptedTargetUserId: data.userId,
      reportType: modal.reportType,
    });
  };

  // 댓글 신고(임시 코드)
  const handleCommentReport = () => {
    console.log('댓글 신고');
  };

  const handleReport = () => {
    if (!modal.reportType) return;

    switch (parsedReportType) {
      case 'post':
        handlePostReport();
        break;
      case 'user':
        handleUserReport();
        break;
      case 'comment':
        handleCommentReport();
        break;
      default:
        break;
    }

    setModal({ id: null, reportType: null });
  };

  const getReportTargetLabel = () => {
    if (!modal.reportType) return '';

    switch (parsedReportType) {
      case 'post':
        return '게시글을';
      case 'user':
        return '이용자를';
      case 'comment':
        return '댓글을';
      default:
        return '';
    }
  };

  return (
    <DimModal isOpen={modal.id}>
      <h3 className={styles.title}>{getReportTargetLabel()} 신고할까요?</h3>
      <p className={styles.description}></p>
      <div className={styles.bottom}>
        <button
          className={styles.bottomButton}
          onClick={() => {
            setModal({ id: null, reportType: null });
          }}
        >
          닫기
        </button>
        <div className={styles.buttonDivider} />
        <button
          className={styles.bottomButton}
          onClick={() => {
            handleReport();
          }}
        >
          신고
        </button>
      </div>
    </DimModal>
  );
}
