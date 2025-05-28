import { deletePost } from '@/apis';
import { DimModal } from '@/shared/component';
import { QUERY_KEY, TOAST } from '@/shared/constant';
import { useAuth, useToast } from '@/shared/hook';
import { getBoard } from '@/shared/lib';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './DeleteConfirmModal.module.css';

export default function DeleteConfirmModal({ modal, setModal }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { invalidUserInfoQuery } = useAuth();
  const { toast } = useToast();
  const currentBoard = getBoard(pathname.split('/')[2]);

  const [deleteSubmitDisabled, setDeleteSubmitDisabled] = useState(false);

  const handleDelete = async () => {
    if (deleteSubmitDisabled) return;
    setDeleteSubmitDisabled(true);
    try {
      const response = await deletePost(currentBoard.id, postId);

      if (response.status === 200) {
        currentBoard.id !== 23
          ? toast(TOAST.POST.delete)
          : toast(TOAST.POST.deleteNoPoints);
        navigate(-1);
        queryClient.removeQueries([QUERY_KEY.post, postId]);
        invalidUserInfoQuery();
      }
    } catch ({ response }) {
      toast(response.data.message);
    } finally {
      setDeleteSubmitDisabled(false);
    }
  };

  return (
    <DimModal isOpen={modal.id}>
      <div className={styles.top}>
        <h3 className={styles.title}>게시글을 삭제할까요?</h3>
        {currentBoard.id !== 23 && (
          <p className={styles.description}>삭제 시 포인트가 차감돼요</p>
        )}
      </div>

      <div className={styles.bottom}>
        <button
          className={styles.bottomButton}
          onClick={() => {
            setModal({ id: null, reportType: null });
          }}
        >
          취소
        </button>
        <div className={styles.buttonDivider} />
        <button
          className={styles.bottomButton}
          onClick={() => {
            handleDelete();
          }}
        >
          삭제
        </button>
      </div>
    </DimModal>
  );
}
