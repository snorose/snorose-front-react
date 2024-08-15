import { authAxios } from '../axios';

export const getCommentList = async (postId) => {
  const response = await authAxios.get(`/v1/posts/${postId}/comments`);
  return response.data.result;
};

export const postComment = async ({ postId, parentId, content }) => {
  const data = {
    parentId,
    content,
  };

  try {
    const response = await authAxios.post(
      `/v1/posts/${postId}/comments`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      alert('댓글 등록이 완료되었습니다!');
    }
    
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert('댓글 등록에 실패했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }

    return error.response;
  }
};
