export const MODAL_OPTIONS = [
  {
    id: 'post-report',
    title: '게시글/유저 신고',
    titleColor: '#FF4B6C',
    children: [
      {
        iconId: 'abuse-comment',
        IconWidth: 25,
        IconHeight: 18,
        text: '욕설 및 비하',
      },
      {
        iconId: 'dollar',
        IconWidth: 25,
        IconHeight: 14,
        text: '상업적 광고 및 판매',
      },
      {
        iconId: 'camera',
        IconWidth: 25,
        IconHeight: 18,
        text: '불법촬영물 등의 유통',
      },
      {
        iconId: 'ban',
        IconWidth: 18,
        IconHeight: 18,
        text: '유출/사칭/사기',
      },
      {
        iconId: 'flag',
        IconWidth: 22,
        IconHeight: 22,
        text: '정치적 발언 빛 분란 유발',
      },
      {
        iconId: 'adult',
        IconWidth: 18,
        IconHeight: 18,
        text: '음란물/불건전한 만남 및 대화',
      },
      {
        iconId: 'horizontal-dot3',
        IconWidth: 18,
        IconHeight: 4,
        text: '도배글 작성',
      },
    ],
  },
  {
    id: 'post-edit',
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
    id: 'exam-review-report',
    title: '시험 후기 신고',
    titleColor: '#000',
  },
  {
    id: 'exam-review-edit',
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
    id: 'exam-review-delete',
    title: '게시글을 삭제할까요?',
    titleColor: '#000',
    children: {
      text: '',
    },
    bottom: {
      redBtn: '삭제',
      greyBtn: '취소',
    },
  },
];
