import { authAxios } from '@/axios';

export const getBest3 = async () => {
  const response = await authAxios.get('/v1/best-posts/home');
  return response?.data.result;
};

//베숙트 게시글 목록 조회 API는 post.js의 getPostList에 포함되어 있습니다.
