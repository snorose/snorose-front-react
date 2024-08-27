const TOAST = Object.freeze({
  EXAM_REVIEW_CREATE: {
    id: 'EXAM_REVIEW_CREATE',
    message: '100P 적립이 완료되었어요',
  },
  EXAM_REVIEW_DELETE: {
    id: 'EXAM_REVIEW_DELETE',
    message: '100P 차감되었어요',
  },
  EXAM_REVIEW_DOWNLOAD: {
    id: 'EXAM_REVIEW_DOWNLOAD',
    message: '50P 차감되었어요',
  },
  NO_SELF_SCRAP: {
    id: 'NO_SELF_SCROP',
    message: '내 게시글은 스크랩할 수 없어요',
  },
  POST_EDIT_SUCCESS: { id: 'POST_EDIT_SUCCESS', message: '게시글 수정 완료' },
  POST_EDIT_FAIL: { id: 'POST_EDIT_FAIL', message: '게시글 수정 실패' },
  POST_CREATE_SUCCESS: {
    id: 'POST-CREATE-SUCCESS',
    message: '게시글 등록 성공!',
  },
  POST_CREATE_FAIL: {
    id: 'POST_CREATE_FAIL',
    message: '게시글 등록에 실패했습니다.',
  },
  POST_DELETE_SUCCESS: {
    id: 'POST_DELETE_SUCCESS',
    message: '게시글이 삭제되었습니다.',
  },
  POST_DELETE_FAIL: {
    id: 'POST_DELETE_FAIL',
    message: '게시글 삭제에 실패했습니다.',
  },
  POST_NOT_FOUND: {
    id: 'POST_NOT_FOUND',
    message: '게시글을 찾을 수 없습니다.',
  },
  POST_EDIT_ERROR: {
    id: 'POST_EDIT_ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
  },
  POST_CREATE_ERROR: {
    id: 'POST_CREATE_ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
  },
  POST_DELETE_ERROR: {
    id: 'POST_DELETE_ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
  },
  EMPTY_TITLE: {
    id: 'EMPTY_TITLE_ERROR',
    message: '제목을 입력하세요.',
  },
  EMPTY_TEXT: {
    id: 'EMPTY_TEXT_ERROR',
    message: '내용을 입력하세요.',
  },
  EMPTY_BOARDID: {
    id: 'EMPTY_BOARD_ERROR',
    message: '게시판을 선택하세요.',
  },
  LIKE_SELF_ERROR: {
    id: 'LIKE_SELF_ERROR',
    message: '자신의 글에는 좋아요를 누를 수 없습니다.',
  },
  SCRAP_SELF_ERROR: {
    id: 'SCRAP_SELF_ERROR',
    message: '자신의 글은 스크랩할 수 없습니다.',
  },
});

export { TOAST };
