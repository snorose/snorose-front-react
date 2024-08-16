import { authAxios } from '../axios';

// 댓글과 대댓글을 재귀적으로 필터링하는 함수
const filterDeletedComments = (comments) => {
  return comments
    .filter((comment) => !comment.isDeleted) 
    .map((comment) => ({
      ...comment,
      children: filterDeletedComments(comment.children),
    }));
};

// 댓글 목록을 가져오는 API
export const getCommentList = async (postId) => {
  try {
    const response = await authAxios.get(`/v1/posts/${postId}/comments`);
    const filteredComments = filterDeletedComments(response.data.result);
    return filteredComments;
  } catch (error) {
    console.error('댓글 목록을 가져오는 데 실패했습니다.', error);
    return error.response;
  }
};

// 댓글을 등록하는 API
export const postComment = async ({ postId, parentId, content }) => {
  const data = {
    parentId,
    content,
  };
  try {
    const response = await authAxios.post(`/v1/posts/${postId}/comments`, data);
    if (response.status === 200) {
      console.log('댓글 등록 성공!');
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

// 댓글을 삭제하는 API
export const deleteComment = async (postId, commentId) => {
  try {
    const response = await authAxios.delete(
      `/v1/posts/${postId}/comments/${commentId}`
    );
    if (response.status === 200) {
      alert('댓글이 삭제되었습니다.');
      return response.data;
    } else {
      alert('댓글 삭제에 실패했습니다.');
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert('댓글을 찾을 수 없습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};
