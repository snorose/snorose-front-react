const TOAST = Object.freeze({
  ATTENDANCE: {
    attendance: '출석체크 완료',
  },
  EXAM_REVIEW: {
    validate: '필수 입력을 모두 작성해주세요',
    create: '100P 적립되었어요',
    delete: '시험후기가 삭제되었어요',
    edit: '시험후기가 수정되었어요',
    download: '다운로드가 완료되었어요',
  },
  POST: {
    create: '2P 적립되었어요',
    delete: '게시글이 삭제되었어요',
    edit: '게시글이 수정되었어요',
    emptyTitle: '제목을 입력해주세요',
    emptyContent: '내용을 입력해주세요',
    emptyBoard: '게시판을 선택해주세요',
  },
  COMMENT: {
    create: '댓글을 등록했어요',
    delete: '댓글이 삭제되었어요',
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
});

export { TOAST };
