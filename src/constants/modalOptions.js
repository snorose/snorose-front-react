import {
  COMMENT_REPORT_TYPE_MODAL_OPTION_CHILDREN,
  POST_REPORT_TYPE_MODAL_OPTION_CHILDREN,
  USER_REPORT_TYPE_MODAL_OPTION_CHILDREN,
} from './board';

export const MODAL_OPTIONS = [
  {
    id: 'report',
    title: '신고하기',
    titleColor: '#FF4B6C',
    children: [
      {
        iconId: 'note',
        IconWidth: 25,
        IconHeight: 18,
        text: '게시글 신고',
        value: 'post-report',
      },
      // {
      //   iconId: 'user',
      //   IconWidth: 19,
      //   IconHeight: 21,
      //   text: '이용자 신고',
      //   value: 'user-report',
      // },
    ],
  },
  {
    id: 'post-report',
    title: '게시글 신고',
    titleColor: '#FF4B6C',
    children: POST_REPORT_TYPE_MODAL_OPTION_CHILDREN,
  },
  {
    id: 'comment-report',
    title: '댓글 신고',
    titleColor: '#FF4B6C',
    children: COMMENT_REPORT_TYPE_MODAL_OPTION_CHILDREN,
  },
  // {
  //   id: 'user-report',
  //   title: '이용자 신고',
  //   titleColor: '#FF4B6C',
  //   children: USER_REPORT_TYPE_MODAL_OPTION_CHILDREN,
  // },
  {
    id: 'post-more-options',
    title: '내 게시글',
    titleColor: '#000',
    children: [
      {
        iconId: 'pencil',
        IconWidth: 14,
        IconHeight: 16,
        text: '수정하기',
        nav: '/post',
      },
      {
        iconId: 'trash',
        IconWidth: 12,
        IconHeight: 16,
        text: '삭제하기',
        color: '#FF4B6C',
        nav: '/post-write',
      },
    ],
  },
  {
    id: 'post-delete',
    title: '게시글을 삭제할까요?',
    titleColor: '#000',
    children: {
      text: '게시글 삭제 시 포인트가 차감돼요',
    },
    bottom: {
      redBtn: '삭제',
      greyBtn: '취소',
    },
  },
  {
    id: 'post-write-exit-check',
    title: '작성 중인 글이 있습니다.',
    titleColor: '#000',
    children: {
      text: '게시글 작성을 취소하시겠습니까?',
    },
    bottom: {
      redBtn: '삭제',
      greyBtn: '취소',
    },
  },
  {
    id: 'post-edit-exit-check',
    title: '수정 중인 글이 있습니다.',
    titleColor: '#000',
    children: {
      text: '게시글 수정을 취소하시겠습니까?',
    },
    bottom: {
      redBtn: '수정 취소',
      greyBtn: '계속 수정',
    },
  },

  {
    id: 'comment-more-options',
    title: '내 댓글',
    titleColor: '#000',
    children: [
      {
        iconId: 'pencil',
        IconWidth: 14,
        IconHeight: 16,
        text: '수정하기',
        nav: '/post',
      },
      {
        iconId: 'trash',
        IconWidth: 12,
        IconHeight: 16,
        text: '삭제하기',
        color: '#FF4B6C',
        nav: '/post-write',
      },
    ],
  },
  {
    id: 'comment-delete',
    title: '댓글을 삭제할까요?',
    titleColor: '#000',
    children: {
      text: '댓글 삭제 시 포인트가 차감돼요',
    },
    bottom: {
      redBtn: '삭제',
      greyBtn: '취소',
    },
  },
  {
    id: 'comment-delete-no-points',
    title: '댓글을 삭제할까요?',
    titleColor: '#000',
    children: {
      text: '',
    },
    bottom: {
      redBtn: '삭제',
      greyBtn: '취소',
    },
  },
  {
    id: 'exam-review-report',
    title: '시험 후기 신고',
    titleColor: '#000',
  },
  {
    id: 'exam-review-option',
    title: '내가 작성한 시험 후기',
    titleColor: '#000',
    children: [
      {
        iconId: 'pencil',
        IconWidth: 14,
        IconHeight: 16,
        text: '수정하기',
        nav: '/post',
      },
      {
        iconId: 'trash',
        IconWidth: 12,
        IconHeight: 16,
        text: '삭제하기',
        color: '#FF4B6C',
        nav: '/post-write',
      },
    ],
  },
  {
    id: 'confirmed-exam-review-option',
    title: '내가 작성한 시험 후기',
    titleColor: '#000',
    children: [
      {
        iconId: 'trash',
        IconWidth: 12,
        IconHeight: 16,
        text: '삭제하기',
        color: '#FF4B6C',
        nav: '/post-write',
      },
    ],
  },
  {
    id: 'exam-review-delete',
    title: '시험 후기를 삭제할까요?',
    titleColor: '#000',
    children: {
      text: '시험 후기 삭제 시 포인트가 차감돼요',
    },
    bottom: {
      redBtn: '삭제',
      greyBtn: '취소',
    },
  },
  {
    id: 'exam-review-download',
    title: '다운로드 하시겠습니까?',
    titleColor: '#000',
    children: {
      text: '다운로드 시 50 포인트가 차감됩니다.',
    },
    bottom: {
      redBtn: '다운',
      greyBtn: '취소',
    },
  },
];

export const MODAL_CONFIRM = {
  EXAM_REVIEW_DUPLICATION: {
    title: `중복후기가 있습니다
          계속 업로드 하시겠습니까?`,
    message: (
      <>
        중복 후기의 경우, 먼저 올라온 후기보다 <br />더 많은 문제가 기록된
        경우만 허용됩니다. <br />
        이외 모든 족보는 무통보 삭제되며 <br />
        포인트 회수 및 <span style={{ color: '#FF4B6C' }}>경고 1회</span>가
        부여됩니다.
      </>
    ),
  },
};
