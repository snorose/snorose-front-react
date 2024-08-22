import { authAxios } from '../axios';

// <<<<<<< HEAD
// // 댓글 목록을 가져오는 API
// export const getCommentList = async (postId) => {
//   try {
//     const response = await authAxios.get(`/v1/posts/${postId}/comments`);
//     return response.data.result;
//   } catch (error) {
//     console.error('댓글 목록을 가져오는 데 실패했습니다.', error);
//     return error.response;
//   }
// };

// // 댓글을 등록하는 API
// =======
// 시험후기 댓글
export const getCommentList = async ({ postId }) => {
  const response = await authAxios.get(`/v1/posts/${postId}/comments`);
  return response.data.result;
};

// >>>>>>> dev
export const postComment = async ({ postId, parentId, content }) => {
  const response = await authAxios.post(`/v1/posts/${postId}/comments`, {
    parentId,
    content,
  });
  // <<<<<<< HEAD
  //   const editedComment = {
  //     parentId: parentId || 0,
  //     content: content,
  //   };

  //   try {
  //     const response = await authAxios.patch(
  //       `/v1/posts/${postId}/comments/${commentId}`,
  //       editedComment
  //     );

  //     if (response.status === 200) {
  //       console.log('댓글 수정 성공!');
  //       return response.data;
  //     } else {
  //       alert('댓글 수정에 실패했습니다.');
  //       return null;
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       alert('댓글을 찾을 수 없습니다.');
  //     } else {
  //       alert('알 수 없는 오류가 발생했습니다.');
  //     }
  //     return null;
  //   }
  // =======
  return response;
};

export const deleteComment = async ({ postId, commentId }) => {
  const response = await authAxios.delete(
    `/v1/posts/${postId}/comments/${commentId}`
  );
  return response;
};

export const editComment = async ({ postId, commentId, content }) => {
  const response = await authAxios.patch(
    `/v1/posts/${postId}/comments/${commentId}`,
    {
      content,
    }
  );
  return response;
  // >>>>>>> dev
};
