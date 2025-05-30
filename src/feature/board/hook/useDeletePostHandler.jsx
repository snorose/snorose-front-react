import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast, useAuth } from '@/shared/hook';
import { deletePost } from '@/apis';
import { TOAST, QUERY_KEY } from '@/shared/constant';
import { useQueryClient } from '@tanstack/react-query';

export function useDeletePostHandler(boardId) {
  const { postId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { invalidUserInfoQuery } = useAuth();

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const submitDisabledRef = useRef(false);

  const handleDelete = async () => {
    if (submitDisabledRef.current) return;
    submitDisabledRef.current = true;
    setSubmitDisabled(true);

    try {
      const response = await deletePost(boardId, postId);

      if (response.status === 200) {
        boardId !== 23
          ? toast(TOAST.POST.delete)
          : toast(TOAST.POST.deleteNoPoints);

        navigate(-1);
        queryClient.removeQueries([QUERY_KEY.post, postId]);
        invalidUserInfoQuery();
      }
    } catch ({ response }) {
      toast(response.data.message);
    } finally {
      submitDisabledRef.current = false;
      setSubmitDisabled(false);
    }
  };

  return { handleDelete, submitDisabled };
}
