export const ROUTE = Object.freeze({
  root: '/',
  home: '/home',
  boardList: '/board',
  allSearch: (keyword) => `/board/all/search/${keyword}`,
  board: (boardName) => `/board/${boardName}`,
  boardNotice: (boardName) => `/board/${boardName}/notice`,
  boardSearch: (boardName) => `/board/${boardName}/search`,
  post: ({ boardName, postId }) => `/board/${boardName}/post/${postId}`,
  postWrite: (boardName) => `/board/${boardName}/post-write`,
  postEdit: ({ boardName, postId }) =>
    `/board/${boardName}/post/${postId}/edit`,
  examReview: '/board/exam-review',
  examReviewDetail: (postId) => `/board/exam-review/post/${postId}`,
  examReviewWrite: '/board/exam-review-write',
  examReviewEdit: (postId) => `/board/exam-review/${postId}/edit`,
  examReviewSearch: (keyword) => `/board/exam-review/search/${keyword}`,
  mypage: '/my-page',
  mypagePassword: '/my-page/password',
  mypageEditInfo: '/my-page/edit-info',
  mypagePoint: '/my-page/view-point-list',
  mypageDeleteAccount: '/my-page/delete-account',
  mypagePraivacyPoicy: '/my-page/privacy-policy',
  mypageServicePolicy: '/my-page/service-policy',
  mypageMyPost: '/my-page/my-post',
  mypageComment: '/my-page/comment',
  mypageDownloadExamReview: '/my-page/download-exam-review',
  mypageScrap: '/my-page/scrap',
  mypageExamReviewScrap: '/my-page/scrap-exam-review',
  login: '/login',
  signUp: '/signup',
  signUpSuccess: '/signup/success',
  signUpFailure: '/signup/failure',
  findId: '/find-id',
  findPw: '/find-pw',
  foundId: '/found-id',
  foundPw: '/found-pw',
  notFoundId: '/not-found-id',
  notFoundPw: '/not-found-pw',
  about: '/about',
  verify: '/verify',
  help: '/help',
  notice: '/notice',
  attendance: '/attendance',
  alert: '/alert',
});
