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
  attachments,
  images,
}) => {
  const data = {
    category: category,
    title: title,
    content: content,
    isNotice: isNotice,
    attachments: attachments,
  };
  console.log(data);
  const response = await authAxios.post(
    `/v1/boards/${boardId}/posts/newpost`,
    data
  );
  console.log(response);
  /*if (attachments.length) {
    console.log('이건 됐음1');
    let attachmentUrlList = response.data.result.attachmentUrlList;
    console.log(response);
    console.log(attachmentUrlList);
    for (let x = 0; x < attachmentUrlList.length; x++) {
      await authAxios.post(`${attachmentUrlList[x]}`, images[x]);
      console.log('이것도 됐음2');
    }
    console.log('이건 됐음3');
  }*/
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
}) => {
  const editedPost = {
    postId: postId,
    category: null,
    title: title,
    content: content,
    isNotice: isNotice,
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
