import { deletePost } from '@/apis';
import { TOAST, QUERY_KEY } from '@/shared/constant';
import { useAuth, useToast } from '@/shared/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function useDeletePost(boardId) {
  const { postId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { invalidUserInfoQuery } = useAuth();
  const [deleteSubmitDisabled, setDeleteSubmitDisabled] = useState(false);

  const handleDelete = async () => {
    if (deleteSubmitDisabled) return;
    setDeleteSubmitDisabled(true);
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
      setDeleteSubmitDisabled(false);
    }
  };

  return { handleDelete, deleteSubmitDisabled };
}
