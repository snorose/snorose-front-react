const TOAST = Object.freeze({
  ATTENDANCE: {
    attendance: '출석체크 완료',
  },
  EXAM_REVIEW: {
    create: '100P 적립되었어요',
    delete: '시험후기가 삭제되었어요',
    edit: '시험후기가 수정되었어요',
    download: '다운로드가 완료되었어요',
  },
  POST: {
    create: '게시글을 등록했어요 (+2P)',
    createNoPoints: '게시글을 등록했어요',
    delete: '게시글이 삭제되었어요 (-2P)',
    deleteNoPoints: '게시글이 삭제되었어요',
    edit: '게시글이 수정되었어요',
  },
  COMMENT: {
    create: '댓글을 등록했어요 (+1P)',
    createNoPoints: '댓글을 등록했어요',
    delete: '댓글이 삭제되었어요 (-1P)',
    deleteNoPoints: '댓글이 삭제되었어요',
    edit: '댓글이 수정되었어요',
  },
  USER: {
    editPassword: '비밀번호가 수정되었어요',
    editUserInfo: '회원 정보가 수정되었어요',
    withdraw: '회원 탈퇴되었어요',
  },
  LOGIN: {
    emptyId: '아이디를 입력해주세요',
    emptyPw: '비밀번호를 입력해주세요',
  },
  VERIFY: {
    notCompleted: '모두 입력해주세요',
    invalidEmail: '올바른 이메일을 입력해주세요',
  },
  ERROR: {
    SERVER: '서버 에러, 잠시 후 다시 시도해주세요',
    NETWORK: '네트워크 에러, 잠시 후 다시 시도해주세요',
  },
  ATTACHMENT: {
    imageFileSizeError: '파일 크기는 최대 5MB까지 업로드할 수 있어요.',
    imageQuantityError: '이미지는 최대 10개까지 첨부 가능해요.',
    videoFileSizeError: '파일 크기는 최대 50MB까지 업로드할 수 있어요.',
    videoQuantityError: '영상은 최대 1개까지 첨부 가능해요.',
  },
});

export { TOAST };
