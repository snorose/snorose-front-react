import { defaultAxios, authAxios } from '@/axios';

// 게시글 리스트 가져오기
export const getPosts = async (boardId, page = 0) => {
  const url =
    boardId === 20
      ? `/v1/best-posts?page=${page}`
      : `/v1/boards/${boardId}/posts/postlist?page=${page}`;

  const response = await authAxios.get(url);
  console.log(response?.data.result);

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
}) => {
  const data = {
    category: category,
    title: title,
    content: content,
    isNotice: isNotice,
    attachments: attachmentsInfo.map(({ type, fileName, fileComment }) => ({
      type,
      fileName,
      fileComment,
    })),
  };
  //'게시글 생성' API에서 받아오는 데이터
  const response = await authAxios.post(
    `/v1/boards/${boardId}/posts/newpost`,
    data
  );

  //만일 '게시글 생성' API에 첨부파일을 넘겼더라면
  if (attachmentsInfo.length) {
    //attachmentUrlList 변수에 '게시글 생성' API한테 받은 이미지 S3 url 리스트 저장
    let attachmentUrlList = response.data.result.attachmentUrlList;

    //각 S3 URL에 file 전달하기 (프런트에서 직접 버킷에 넣기)
    for (let x = 0; x < attachmentUrlList.length; x++) {
      try {
        await defaultAxios.put(
          `${attachmentUrlList[x]}`,
          attachmentsInfo[x].file,
          {
            baseURL: '',
            headers: {
              'Content-Type': `${attachmentsInfo[x].fileType}`,
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
    await defaultAxios;
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
  attachmentsInfo,
  deleteAttachments,
}) => {
  const editedPost = {
    postId,
    category: null,
    title: title,
    content: content,
    //isNotice: isNotice,
    finalAttachments: attachmentsInfo.map((att) => ({
      id: att.id,
      fileName: att.fileName,
      fileComment: att.fileComment,
      type: att.type,
    })),
    deleteAttachments,
  };

  try {
    const response = await authAxios.patch(
      `/v1/boards/${boardId}/posts/${postId}/update`,
      editedPost
    );
    const newFiles = attachmentsInfo
      .filter((att) => att.id === '')
      .map((att) => att.file);

    response.data.result.attachmentUrlList.map(async (url, index) => {
      await defaultAxios.put(`${url}`, newFiles[index]);
    });

    return response;
  } catch (e) {
    console.log(e);
  }
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

//게시글 썸네일 생성
export const createThumbnail = async (boardId, postId) => {
  console.log(boardId, postId);
  await defaultAxios.post(`/v1/boards/${boardId}/posts/${postId}/thumbnail`);
};
