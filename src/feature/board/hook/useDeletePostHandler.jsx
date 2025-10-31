import { useRef, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast, useAuth } from '@/shared/hook';
import { deletePost, deleteEvent } from '@/apis';
import { TOAST, QUERY_KEY } from '@/shared/constant';
import { useQueryClient } from '@tanstack/react-query';
import { ModalContext } from '@/shared/context/ModalContext';

export function useDeletePostHandler(boardId) {
  const { postId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { invalidUserInfoQuery } = useAuth();
  const { setModal } = useContext(ModalContext);

  const submitDisabledRef = useRef(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleDelete = async () => {
    if (submitDisabledRef.current) return;
    submitDisabledRef.current = true;
    setSubmitDisabled(true);

    try {
      const response =
        boardId === 14
          ? await deleteEvent(postId)
          : await deletePost(boardId, postId);

      if (response.status === 200) {
        [21, 22].includes(boardId)
          ? toast({ message: TOAST.POST.delete, variant: 'success' })
          : toast({ message: TOAST.POST.deleteNoPoints, variant: 'success' });

        navigate(-1);
        queryClient.removeQueries(QUERY_KEY.post(postId));
        invalidUserInfoQuery();
      }
    } catch ({ response }) {
      toast({ message: response.data.message });
    } finally {
      submitDisabledRef.current = false;
      setSubmitDisabled(false);
      setModal({ id: null, type: null });
    }
  };

  return { handleDelete, submitDisabled };
}
