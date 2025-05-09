import PostBar from './PostBar';
const now = new Date();

const postBarStoryConfig = {
  component: PostBar,
  parameters: {
    docs: {
      description: {
        component:
          'PostBar 컴포넌트는 게시판에서 여러 글을 나열할때 사용됩니다.\n\n' +
          '**주의 사항**\n' +
          '- 해당 컴포넌트는 게시판에서 각 글의 정보(좋아요 수 등)을 표시만 하기 때문에 아이콘을 눌러도 별 작용이 없습니다.\n' +
          '- 생성된 날짜(data.createAt)는 시기에 따라서 표기법이 다릅니다 (date.js의 postBarDateFormat 참고).\n * `1시간 내의 글일때`: m분전\n * `1시간 이후의 오늘내의 글일때`: hh:mm\n * `오늘 이전의 올해 글일때`: month/day hh:mm\n * `올해 이전 글일때`: year/month/day hh:mm\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `SearchExamReviews.jsx`: 여러개의 PostBar을 링크기능을 덧붙여, 한꺼번에 띄우기 위한 ExamReviewsPage의 개별 component입니다.\n' +
          '- `src/pages/MyPage/pages/ActivityPage/components/Posts/Posts.jsx`: 여러개의 PostBar을 링크기능을 덧붙여, 한꺼번에 띄우기 위한 ActivityPage의 개별 component입니다. \n' +
          '- `SearchResults.jsx`: 여러개의 PostBar을 링크기능을 덧붙여, 한꺼번에 띄우기 위한 SearchPage의 개별 component입니다. \n' +
          '- `src/pages/PostsPage/components/Posts.jsx`: 여러개의 PostBar을 링크기능을 덧붙여, 한꺼번에 띄우기 위한 PostsPage의 개별 component입니다. \n\n',
      },
    },
  },
  args: {
    data: {
      userDisplay: '익명송이',
      createdAt: `${now.toISOString()}`,
      title: '예시 제목',
      content: '예시 본문 요약 내용',
      boardName: '첫눈온방',
      commentCount: 0,
      isLiked: false,
      likeCount: 0,
      isScrapped: false,
      scrapCount: 0,
    },
    hasComment: true,
    hasLike: true,
  },
  argTypes: {
    data: {
      description:
        'PostBar에 띄워줘야하는 여러 정보들이 담겨져 있습니다.\n' +
        '- data.userDisplay: 글을 생성한 사람의 닉네임.\n' +
        '- data.createdAt: 글 생성 시간.\n' +
        '- data.title: 글 제목.\n' +
        '- data.questionDetail: 시험후기에 사용될 경우, data.content 대신 나타나는 시험후기 요약 내용\n' +
        '- data.content: 글 본문의 일부\n' +
        '- data.boardName: 글이 생성된 게시판의 이름\n' +
        '- data.commentCount: 댓글 개수\n' +
        '- data.isLiked: 유저가 해당 글을 좋아요 눌렀었는지에 대한 여부\n' +
        '- data.likeCount: 좋아요 개수' +
        '- data.isScrapped: 유저가 해당 글을 스크랩 했는지에 대한 여부' +
        '- data.scrapCount: 스크랩 개수',
      defaultValue: {},
      table: {
        type: {
          summary: 'object',
        },
      },
      control: { type: 'object' },
    },
    hasComment: {
      description: `댓글 개수를 띄울것인지 말지에 대한 변수입니다. false이면 말풍선 아이콘까지 사라집니다.`,
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: {
        type: 'boolean',
      },
    },
    hasLike: {
      description: `좋아요 개수를 띄울지 말지에 대한 변수입니다. false이면 하트 아이콘까지 사라집니다.`,
      default: true,
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: {
        type: 'boolean',
      },
    },
  },
};
export default postBarStoryConfig;

const Template = (args) => <PostBar {...args} />;
export const Default = Template.bind({});
Default.args = {};
