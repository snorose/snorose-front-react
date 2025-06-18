import { authAxios } from '@/axios';

// 게시글 리스트 가져오기
export const getPosts = async (boardId, page = 0) => {
  const url =
    boardId === 20
      ? `/v1/best-posts?page=${page}`
      : `/v1/boards/${boardId}/posts/postlist?page=${page}`;

  const response = await authAxios.get(url);

  return response?.data.result;
};

// 게시글 상세 조회
export const getPostContent = async (boardId, postId) => {
  const response = await authAxios.get(`/v1/boards/${boardId}/posts/${postId}`);
  return response?.data.result;
};

// 게시글 등록
export const postPost = async ({
  category = '',
  boardId,
  title,
  content,
  isNotice,
}) => {
  const data = {
    category: category,
    title: title,
    content: content,
    isNotice: isNotice,
  };
  const response = await authAxios.post(
    `/v1/boards/${boardId}/posts/newpost`,
    data
  );
  return response;
};

// 게시글 삭제
export const deletePost = async (boardId, postId) => {
  const response = await authAxios.delete(
    `/v1/boards/${boardId}/posts/${postId}`
  );
  return response;
};

// 게시글을 수정
export const patchPost = async ({
  boardId,
  postId,
  title,
  content,
  isNotice,
  deleteAttachments = [],
  finalAttachments = [],
}) => {
  const editedPost = {
    postId,
    category: null,
    title,
    content,
    isNotice,
    deleteAttachments,
    finalAttachments,
  };

  const response = await authAxios.patch(
    `/v1/boards/${boardId}/posts/${postId}/update`,
    editedPost
  );

  return response;
};

// 게시글 신고
export const reportPost = async (boardId, postId, body) => {
  const { data } = await authAxios.post(
    `/v1/boards/${boardId}/posts/${postId}/report`,
    body
  );

  return data;
};

// 유저 신고
export const reportUser = async (body) => {
  const { data } = await authAxios.post(`/v1/users/report`, body);

  return data;
};
