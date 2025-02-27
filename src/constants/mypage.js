import { QUERY_KEY } from '@/shared/constant';

import {
  getMyPosts,
  getMyComments,
  getDonwloadedExamReviews,
  getScrapedExamReviews,
  getScrapedPosts,
} from '@/apis/userInfo.js';
import { ROUTE } from '@/constants/route.js';

export const ACTIVITIES = [
  {
    path: ROUTE.mypageMyPost,
    title: '내가 쓴 글',
    queryKey: QUERY_KEY.myPosts,
    queryFn: getMyPosts,
    errorMessage: '아직 작성한 글이 없어요',
  },
  {
    path: ROUTE.mypageComment,
    title: '댓글 단 글',
    queryKey: QUERY_KEY.myCommentedPosts,
    queryFn: getMyComments,
    errorMessage: '아직 작성한 댓글이 없어요',
  },
  {
    path: ROUTE.mypageDownloadExamReview,
    title: '다운받은 시험후기',
    queryKey: QUERY_KEY.myDownloadedExamReviews,
    queryFn: getDonwloadedExamReviews,
    hasLike: false,
    errorMessage: '아직 다운받은 후기가 없어요',
  },
  {
    path: ROUTE.mypageExamReviewScrap,
    title: '시험 후기 스크랩',
    queryKey: QUERY_KEY.myScrapedExamReviews,
    queryFn: getScrapedExamReviews,
    hasLike: false,
    errorMessage: '아직 스크랩한 시험 후기가 없어요',
  },
  {
    path: ROUTE.mypageScrap,
    title: '스크랩',
    queryKey: QUERY_KEY.myScrapedPosts,
    queryFn: getScrapedPosts,
    errorMessage: '아직 스크랩 한 글이 없어요',
  },
];
