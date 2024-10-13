export const QUERY_KEY = Object.freeze({
  homeNotice: 'homeNotice',
  banner: 'banner',
  attendance: 'monthlyAttendanceHistory',
  search: 'search',
  post: 'post',
  posts: 'posts',
  comments: 'comments',
  noticeLine: 'noticeLine',
  notices: 'notices',
  pointHistory: 'pointHistory',
  userInfo: 'userInfo',
  myPosts: 'myPosts',
  myCommentedPosts: 'myCommentedPosts',
  myDownloadedExamReviews: 'myDownloadedExamReviews',
  myScrappedPosts: 'myScrappedPosts',
  myScrappedExamReviews: 'myScrappedExamReviews',
});

export const MUTATION_KEY = Object.freeze({
  editPost: 'editPost',
  createExamReview: 'createExamReview',
  deleteExamReview: 'deleteExamReview',
  editExamReview: 'editExamReview',
  createComment: 'createComment',
  deleteComment: 'deleteComment',
  editComment: 'editComment',
  reportPost: 'reportPost',
  reportUser: 'reportUser',
  reportComment: 'reportComment',
  like: 'like',
  unlike: 'unlike',
  scrap: 'scrap',
  unscrap: 'unscrap',
  updateUserInfo: 'updateUserInfo',
  updatePassword: 'updatePassword',
});

export const STALE_TIME = Object.freeze({
  examReview: 1000 * 60 * 5,
  boardPostList: 1000 * 60 * 1,
  mypageActivity: 1000 * 60 * 5,
});
