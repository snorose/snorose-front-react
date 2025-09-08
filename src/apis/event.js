import { authAxios } from '@/axios';

// 이벤트 게시글 상세조회
export const getEventContent = async (postId) => {
  const response = await authAxios.get(`v1/events/${postId}`);
  return response?.data.result;
};

// 이벤트 게시글 등록
export const postEvent = async ({
  category,
  isNotice,
  title,
  content,
  host,
  place,
  startDate,
  endDate,
  announceDate,
  drawCount,
  link,
}) => {
  const data = {
    category: category,
    isNotice: isNotice,
    title: title,
    content: content,
    host: host,
    place: place,
    startDate: startDate,
    endDate: endDate,
    announceDate: announceDate,
    drawCount: drawCount,
    link: link,
  };
  const response = await authAxios.post(`/v1/events`, data);
  return response;
};

// 이벤트 리스트 조회는 post.js에 포함되어 있습니다.

// 이벤트 게시글 수정
export const patchEvent = async ({
  postId,
  category,
  isNotice,
  title,
  content,
  host,
  place,
  startDate,
  endDate,
  announceDate,
  drawCount,
  link,
}) => {
  const editedEvent = {
    postId,
    category,
    isNotice,
    title,
    content,
    host,
    place,
    startDate,
    endDate,
    announceDate,
    drawCount,
    link,
  };

  const response = await authAxios.patch(`v1/events/${postId}`, editedEvent);

  console.log('서버요청완료');

  return response;
};

// 이벤트 게시글 삭제
export const deleteEvent = async (postId) => {
  const response = await authAxios.delete(`/v1/events/${postId}`);
  return response;
};
