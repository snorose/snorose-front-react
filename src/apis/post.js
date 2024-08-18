import { authAxios } from '../axios';

export const getPostList = async (boardId, page = 0) => {
  const response = await authAxios.get(
    `/v1/boards/${boardId}/posts/postlist?page=${page}`
  );
  return response.data.result;
};

export const getPostContent = async (boardId, postId) => {
  const response = await authAxios.get(`/v1/boards/${boardId}/posts/${postId}`);
  return response.data.result;
};

// 게시글을 등록하는 API
export const postPost = async ({ category, boardId, title, content, isNotice }) => {
  const data = {
    category: category,
    title: title,
    content: content,
    isNotice: isNotice,
  };
  try {
    const response = await authAxios.post(
      `/v1/boards/${boardId}/posts/newpost`,
      data
    );
    if (response.status === 200) {
      console.log('게시글 등록 성공!');
    }
    return response.data.result;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert('게시글 등록에 실패했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }

    return error.response;
  }
};

// 게시글을 삭제하는 API
export const deletePost = async (boardId, postId) => {
  try {
    const response = await authAxios.delete(
      `/v1/boards/${boardId}/posts/${postId}`
    );
    if (response.status === 200) {
      alert('게시글이 삭제되었습니다.');
      return response;
    } else {
      alert('게시글 삭제에 실패했습니다.');
      return null;
    }
  } catch (error) {
    if (error.response.status === 404) {
      alert('게시글을 찾을 수 없습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

// 게시글을 수정하는 API
export const patchPost = async ({ boardId, postId, title, content }) => {
  console.log(
    `patchPost에 전달된 값들: boardId=${boardId}, postId=${postId}, title=${title}, content=${content}`
  );

  const editedPost = {
    postId: postId,
    category: null,
    title: title,
    content: content,
  };

  try {
    const response = await authAxios.patch(
      `/v1/boards/${boardId}/posts/${postId}/update`,
      editedPost
    );

    if (response.status === 200) {
      console.log('게시글 수정 성공!');
      return response.data.response;
    } else {
      alert('게시글 수정에 실패했습니다.');
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert('게시글을 찾을 수 없습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};
