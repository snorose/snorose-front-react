import { defaultAxios, authAxios } from '@/axios';

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
  attachmentsInfo,
  files,
}) => {
  const data = {
    category: category,
    title: title,
    content: content,
    isNotice: isNotice,
    attachments: attachmentsInfo.map(({ fileType, ...info }) => info),
  };
  console.log(data);
  //'게시글 생성' API에서 받아오는 데이터
  const response = await authAxios.post(
    `/v1/boards/${boardId}/posts/newpost`,
    data
  );

  //만일 '게시글 생성' API에 첨부파일을 넘겼더라면
  if (attachmentsInfo.length) {
    //attachmentUrlList 변수에 '게시글 생성' API한테 받은 이미지 S3 url 리스트 저장
    let attachmentUrlList = response.data.result.attachmentUrlList;

    console.log(attachmentUrlList);
    console.log(files);
    //각 S3 URL 리스트에 대해 반복
    for (let x = 0; x < attachmentUrlList.length; x++) {
      try {
        await defaultAxios.put(`${attachmentUrlList[x]}`, files[x], {
          baseURL: '',
          headers: {
            'Content-Type': `${attachmentsInfo[x].fileType}`,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
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
