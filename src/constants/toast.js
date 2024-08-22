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
  postEditSuccess: { id: 'post-edit-success', message: '게시글 수정 완료' },
  postEditFail: { id: 'post-edit-fail', message: '게시글 수정 실패' },
  postCreateSuccess: {
    id: 'post-create-success',
    message: '게시글 등록 성공!',
  },
  postCreateFail: {
    id: 'post-create-fail',
    message: '게시글 등록에 실패했습니다.',
  },
  postDeleteSuccess: {
    id: 'post-delete-success',
    message: '게시글이 삭제되었습니다.',
  },
  postDeleteFail: {
    id: 'post-delete-fail',
    message: '게시글 삭제에 실패했습니다.',
  },
  postNotFound: { id: 'post-not-found', message: '게시글을 찾을 수 없습니다.' },
  postEditError: {
    id: 'post-edit-error',
    message: '알 수 없는 오류가 발생했습니다.',
  },
  postCreateError: {
    id: 'post-create-error',
    message: '알 수 없는 오류가 발생했습니다.',
  },
  postDeleteError: {
    id: 'post-delete-error',
    message: '알 수 없는 오류가 발생했습니다.',
  },
});

export { TOAST };
